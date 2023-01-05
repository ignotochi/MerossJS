import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewContainerRef
} from '@angular/core';
import { BadgeStatus } from 'src/app/core/components/badge-status/badge-status.component';
import { Auth } from 'src/app/services/auth.service';
import { LoadMerossDevices } from '../load-devices/load-devices.component';



@Component({
    selector: 'merossHome',
    templateUrl: './meross-home.component.html',
    styleUrls: ['./meross-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerossHome implements OnInit, AfterViewInit, OnDestroy {
    constructor(private containerRef: ViewContainerRef, public auth: Auth) {
    }

    ngOnInit() {
        this.containerRef.createComponent<BadgeStatus>(BadgeStatus);
        this.containerRef.createComponent<LoadMerossDevices>(LoadMerossDevices);
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
    }
}