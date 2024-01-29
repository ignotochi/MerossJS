import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Auth } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { Menu, language, languageAction } from 'src/app/enum/enums';
import { PollingChangeDetectorService } from 'src/app/core/detectors/polling-change-detector.service';
import { Router } from '@angular/router';
import { LanguageChangeDetectorService } from 'src/app/core/detectors/language-change-detector.service';
import { Subject, debounceTime, filter } from 'rxjs';
import { I18nService } from 'src/app/services/i18n.service';
import { Settings } from 'src/app/core/constants';

@Component({
    selector: 'meross-home',
    templateUrl: './meross-home.component.html',
    styleUrls: ['./meross-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PollingChangeDetectorService, LanguageChangeDetectorService]
})

export class MerossHome implements OnInit, AfterViewInit, OnDestroy {

    private languageActionDelay_ms: number = 2000;
    private languageAction$ = new Subject<language>();

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

        this.languageAction$.pipe(debounceTime(this.languageActionDelay_ms)).subscribe((value) => {

            this.langAuthDetector.setLanguage(value);
      
            setTimeout(() => {
                this.router.navigate([Menu.Home]);
            }, 500);
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
        this.langAuthDetector.compleDataChanges();
        this.languageAction$.unsubscribe();
    }

    changeLanguage(value: string): string {

        this.languageActionDelay_ms += 1000;

        if (value === language.It) {
            this.commonService.appSettings.language = language.En;
            this.languageAction$.next(language.En);
            return language.En;
        }
        else if (value === language.En) {
            this.commonService.appSettings.language = language.De;
            this.languageAction$.next(language.De);
            return language.De;
        }
        else if (value === language.De) {
            this.commonService.appSettings.language = language.Es;
            this.languageAction$.next(language.Es);
            return language.Es;
        }
        else if (value === language.Es) {
            this.commonService.appSettings.language = language.Fr;
            this.languageAction$.next(language.Fr);
            return language.Fr;
        }
        else if (value === language.Fr) {
            this.commonService.appSettings.language = language.Ru;
            this.languageAction$.next(language.Ru);
            return language.Ru;
        }
        else if (value === language.Ru) {
            this.commonService.appSettings.language = language.Cn;
            this.languageAction$.next(language.Cn);
            return language.Cn;
        }
        else {
            this.commonService.appSettings.language = language.It;
            this.languageAction$.next(language.It);
            return language.It;
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