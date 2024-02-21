import { AfterViewInit, Directive, OnDestroy, OnInit } from "@angular/core";
import { Subscription, filter, takeWhile, timer } from "rxjs";
import { PollingChangeDetectorService } from "src/app/core/detectors/polling-change-detector.service";
import { FilterName, PollingAction, polling } from "src/app/enum/enums";
import { DeviceFilter } from "src/app/types/filter-types";
import { BaseFilterableComponent } from "src/app/core/base-components/base-filter/base-filterable.component";
import { DeviceService } from "src/app/components/device-components/device.service";

@Directive({
    standalone: true,
    selector: 'device-polling',
})

export class DevicePollingComponent extends BaseFilterableComponent<DeviceFilter> implements OnInit, OnDestroy, AfterViewInit {

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

    private getDataPolling(interval_ms: number) {

        this.deviceLoadPolling$ = timer(60000, interval_ms)

            .pipe(takeWhile(t => this.continuePollingIteration(t) && !this.stopIteration))

            .subscribe(() => this.filter.device.invoke());
    }

    private continuePollingIteration(attemps: number): boolean {

        let result: boolean = true;

        const overAttemps = attemps >= this.maxPollingAttemps();

        if (overAttemps)
            result = this.pollingSubscriptionAction(polling.timeout);

        else if (!overAttemps)
            result = this.pollingSubscriptionAction(polling.continue);

        return result;
    }

    private pollingSubscriptionAction(value: polling): boolean {

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

    private maxPollingAttemps() {
        return (this.pollingTimeout_mm * 60) / (this.pollingInterval_ms / 1000);
    }
}