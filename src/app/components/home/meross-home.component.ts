import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewContainerRef
} from '@angular/core';
import { BadgeStatus } from 'src/app/core/components/badge-status/badge-status.component';
import { LoadMerossDevices } from '../load-devices/load-devices.component';



@Component({
    selector: 'merossHome',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerossHome implements OnInit, AfterViewInit, OnDestroy {
    constructor(private containerRef: ViewContainerRef) {
    }

    ngOnInit() {
        this.containerRef.createComponent<BadgeStatus>(BadgeStatus);
        this.containerRef.createComponent<LoadMerossDevices>(LoadMerossDevices);
        //this.containerRef.createComponent<ToggleMerossDevice>(ToggleMerossDevice);
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
    }
}