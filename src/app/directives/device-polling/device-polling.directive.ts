import { AfterViewInit, Directive, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription, catchError, filter, switchMap, takeWhile, timer } from "rxjs";
import { DeviceService } from "src/app/services/device.service";
import { IDevicesFilter } from "src/app/interfaces/IDevicesFilter";
import { IDevice } from "src/app/interfaces/IDevice";
import { PollingChangeDetectorService } from "src/app/core/detectors/polling-change-detector.service";
import { pollingActions } from "src/app/enums/enums";

enum pollingAction {
    timeout = "timeout",
    stop = "stop",
    continue = 'continue'
}

@Directive({
    standalone: true,
    selector: 'device-polling',
})

export class DevicePollingComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    public devicesSearch: IDevicesFilter[] = [];

    @Input()
    public datasource: IDevice[] = [];

    private stopIteration: boolean = false;
    private pollingTimeout_mm: number = 180;
    private pollingInterval_ms: number = 15000;
    private communicationTestPolling$: Subscription = new Subscription();;

    constructor(private authDetector: PollingChangeDetectorService, private deviceService: DeviceService) {

        this.authDetector.getDataChanges().pipe(filter(tt => tt.action === pollingActions.Enabled))

            .subscribe((result) => {

                if (result.payload == true) {
                    this.stopIteration = false;
                    this.getDataPolling(this.pollingInterval_ms);
                }
                else {
                    this.stopIteration = true;
                }
            });
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.communicationTestPolling$.unsubscribe();
        this.authDetector.compleDataChanges();
    }

    ngAfterViewInit() {
    }

    getDataPolling(interval_ms: number) {

        this.communicationTestPolling$ = timer(1000, interval_ms)

            .pipe(takeWhile(t => this.continuePollingIteration(t) && !this.stopIteration),

                switchMap(() => {
                    return this.deviceService.loadMerossDevices(this.devicesSearch);
                }),

                catchError((err: any) => {
                    throw (err);
                }))

            .subscribe(result => {

                if (result.length > 0) {
                    this.datasource = result;
                }
            });
    }

    continuePollingIteration(attemps: number): boolean {

        let result: boolean = true;

        const overAttemps = attemps >= this.maxPollingAttemps();

        if (overAttemps)
            result = this.pollingSubscriptionAction(pollingAction.timeout);

        else if (!overAttemps)
            result = this.pollingSubscriptionAction(pollingAction.continue);

        return result;
    }

    pollingSubscriptionAction(value: pollingAction): boolean {

        let continueToSubscription: boolean = false;

        if (value === pollingAction.continue) {
            return continueToSubscription = true;
        }

        if (value === pollingAction.timeout) {
            continueToSubscription = false;
        }

        if (value === pollingAction.stop) {
            continueToSubscription = false;
        }

        return continueToSubscription;
    }

    maxPollingAttemps() {
        return (this.pollingTimeout_mm * 60) / (this.pollingInterval_ms / 1000);
    }
}