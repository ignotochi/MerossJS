import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Auth } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { Menu, language, languageAction } from 'src/app/enums/enums';
import { PollingChangeDetectorService } from 'src/app/core/detectors/polling-change-detector.service';
import { Router } from '@angular/router';
import { LanguageChangeDetectorService } from 'src/app/core/detectors/language-change-detector.service';
import { filter } from 'rxjs';
import { I18nService } from 'src/app/services/i18n.service';

@Component({
    selector: 'meross-home',
    templateUrl: './meross-home.component.html',
    styleUrls: ['./meross-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PollingChangeDetectorService, LanguageChangeDetectorService]
})

export class MerossHome implements OnInit, AfterViewInit, OnDestroy {

    mySubscription: any;

    constructor(private router: Router, public auth: Auth, private pollingAuthDetector: PollingChangeDetectorService, private langAuthDetector: LanguageChangeDetectorService,
        public commonService: CommonService, private i18n: I18nService) {

        if (this.commonService.options.polling) {
            this.pollingAuthDetector.enabled(true);
        }

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

        this.langAuthDetector.getDataChanges().pipe(filter(tt => tt.action === languageAction.Language))

            .subscribe((result) => {
                this.i18n.userLangauge = result.payload;
            });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
        this.langAuthDetector.compleDataChanges();
    }

    changeLanguage(value: string): string {

        setTimeout(() => {
            this.router.navigate([Menu.Home]);
        }, 500);

        if (value === 'it') {
            this.commonService.appSettings.language = language.En;
            this.langAuthDetector.setLanguage(language.En)
            return 'en';
        }
        else {
            this.commonService.appSettings.language = language.It;
            this.langAuthDetector.setLanguage(language.It)
            return 'it';
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
            this.pollingAuthDetector.enabled(false);
        }
        else {
            this.commonService.options.polling = true;
            this.pollingAuthDetector.enabled(true);
        }
    }
}