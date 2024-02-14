import { AfterViewInit, Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription, catchError, filter, switchMap, takeWhile, timer } from "rxjs";
import { DeviceService } from "src/app/services/device.service";
import { IDevice } from "src/app/interfaces/IDevice";
import { PollingChangeDetectorService } from "src/app/core/detectors/polling-change-detector.service";
import { FilterName, PollingAction, polling } from "src/app/enum/enums";
import { BaseFilterComponent } from "src/app/components/base/base-filter.component";
import { DeviceFilter } from "src/app/types/filter-types";


@Directive({
    standalone: true,
    selector: 'device-polling',
})

export class DevicePollingComponent extends BaseFilterComponent<DeviceFilter> implements OnInit, OnDestroy, AfterViewInit {


    @Output() updateFromPolling = new EventEmitter<IDevice[]>();

    private stopIteration: boolean = false;
    private pollingTimeout_mm: number = 180;
    private pollingInterval_ms: number = 120000;
    private deviceLoadPolling$: Subscription = new Subscription();

    constructor(private authDetector: PollingChangeDetectorService, private deviceService: DeviceService) {

        super(FilterName.Device);

        this.authDetector.getDataChanges().pipe(filter(tt => tt.action === PollingAction.Enabled))

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
        this.deviceLoadPolling$.unsubscribe();
        this.authDetector.compleDataChanges();
    }

    ngAfterViewInit() {
    }

    getDataPolling(interval_ms: number) {

        this.deviceLoadPolling$ = timer(1000, interval_ms)

            .pipe(takeWhile(t => this.continuePollingIteration(t) && !this.stopIteration),

                switchMap(() => {

                    return this.deviceService.loadMerossDevices(this.filter.device);
                }),

                catchError((err: any) => {
                    throw (err);
                }))

            .subscribe(result => {

                if (result.length > 0) {
                    this.updateFromPolling.emit(result);
                }
            });
    }

    continuePollingIteration(attemps: number): boolean {

        let result: boolean = true;

        const overAttemps = attemps >= this.maxPollingAttemps();

        if (overAttemps)
            result = this.pollingSubscriptionAction(polling.timeout);

        else if (!overAttemps)
            result = this.pollingSubscriptionAction(polling.continue);

        return result;
    }

    pollingSubscriptionAction(value: polling): boolean {

        let continueToSubscription: boolean = false;

        if (value === polling.continue) {
            return continueToSubscription = true;
        }

        if (value === polling.timeout) {
            continueToSubscription = false;
        }

        if (value === polling.stop) {
            continueToSubscription = false;
        }

        return continueToSubscription;
    }

    maxPollingAttemps() {
        return (this.pollingTimeout_mm * 60) / (this.pollingInterval_ms / 1000);
    }
}