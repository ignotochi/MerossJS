import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewContainerRef
} from '@angular/core';
import { Auth } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { language } from 'src/app/enums/enums';
import { PollingChangeDetectorService } from 'src/app/core/detectors/polling-change-detector.service';

@Component({
    selector: 'meross-home',
    templateUrl: './meross-home.component.html',
    styleUrls: ['./meross-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerossHome implements OnInit, AfterViewInit, OnDestroy {

    constructor(private containerRef: ViewContainerRef, public auth: Auth, private authDetector: PollingChangeDetectorService, public commonService: CommonService) {

        if (this.commonService.options.polling) {
            this.authDetector.enabled(true);
        }
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
        this.authDetector.compleDataChanges();
    }

    changeLanguage(value: string): string {   
        if (value === 'it-IT') {
            this.commonService.appSettings.language = language.En;
            return 'en-EN';
        }
        else {
            this.commonService.appSettings.language = language.It;
            return 'it-IT';
        }
    }

    changeGridColumns(value: number): string {
        if (value === 4) {
            this.commonService.options.columns = 8;
            return '8';
        }
        else {
            this.commonService.options.columns = 4;
            return '4';
        }
    }

    enablePolling(value: boolean): void {
    
        if (value === true) {
            this.commonService.options.polling = false;
            this.authDetector.enabled(false);
        }
        else {
            this.commonService.options.polling = true;
            this.authDetector.enabled(true);
        }
    }
}