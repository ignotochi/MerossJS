import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
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

    public options = { language: 'it-IT' , polling: false, columns: 4 };
    
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

    changeLanguage(value: string): string {   
        if (value === 'it-IT') {
            this.options.language = 'en-EN';
            return 'en-EN';
        }
        else {
            this.options.language = 'it-IT';
            return 'it-IT';
        }
    }

    changeGridColumns(value: number): string {
        if (value === 4) {
            this.options.columns = 8;
            return '8';
        }
        else {
            this.options.columns = 4;
            return '4';
        }
    }

    enablePolling(value: boolean): string {
        if (value === true) {
            this.options.polling = false;
            return 'Disattivo';
        }
        else {
            this.options.polling = true;
            return 'Attivo';
        }
    }
}