import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Auth } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { Menu, Language, LanguageAction, FilterName } from 'src/app/enum/enums';
import { PollingChangeDetectorService } from 'src/app/core/detectors/polling-change-detector.service';
import { Router } from '@angular/router';
import { LanguageChangeDetectorService } from 'src/app/core/detectors/language-change-detector.service';
import { Subject, debounceTime, filter } from 'rxjs';
import { I18nService } from 'src/app/services/i18n.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeviceFilter } from 'src/app/types/filter-types';
import { FilterService } from '../filters-components/filter.service';
import { BaseFilterableComponent } from 'src/app/core/base-components/base-filter/base-filterable.component';
import { DeviceFilterDialogComponent } from '../filters-components/device-filter.component';
import { CommonMatModules } from '../components.module';
import { LoadMerossDevice } from '../device-components/device-load-component/device-load.component';
import { SharedModule } from 'src/app/shared.module';
import { executeFunctionRecursivelyBasedOnConditionAsync, isNullOrEmptyString } from 'src/app/utils/helper';

@Component({
    standalone: true,
    selector: 'meross-home',
    templateUrl: './meross-home.component.html',
    styleUrls: ['./meross-home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CommonService, PollingChangeDetectorService, LanguageChangeDetectorService, FilterService],
    imports: [CommonMatModules, MatDialogModule, LoadMerossDevice, SharedModule]
})

export class MerossHome extends BaseFilterableComponent<DeviceFilter> implements OnInit, AfterViewInit, OnDestroy {

    public showVersion: { show: boolean } = { show: false };

    private languageActionDelay_ms: number = 2000;
    private languageAction$ = new Subject<Language>();

    constructor(private router: Router, public auth: Auth, private pollingAuthDetector: PollingChangeDetectorService, private langAuthDetector: LanguageChangeDetectorService,
        public commonService: CommonService, private i18n: I18nService, public dialog: MatDialog) {

        super(FilterName.Device);

        if (this.commonService.options.polling) {
            this.pollingAuthDetector.enabled(true);
        }

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;

        this.langAuthDetector.getDataChanges().pipe(filter(tt => tt.action === LanguageAction.Language))
            .subscribe((result) => this.i18n.userLangauge = result.payload);

        this.languageAction$.pipe(debounceTime(this.languageActionDelay_ms)).subscribe((value) => {
            this.langAuthDetector.setLanguage(value);
            this.commonService.saveSettings();
            this.router.navigate([Menu.Home]);
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        (async (showVersion, appSettings) => {

            const execute = (showVersion: { show: boolean }): void => { showVersion.show = true };         
            const condition = (attempt: number, maxAttemps: number): boolean => isNullOrEmptyString(appSettings.version) && attempt <= maxAttemps;
            
            await executeFunctionRecursivelyBasedOnConditionAsync(() => execute(showVersion), condition);

        })(this.showVersion, this.commonService.appSettings);
    }

    ngOnDestroy(): void {
        this.langAuthDetector.compleDataChanges();
        this.languageAction$.unsubscribe();
    }

    public openDialog(): void {

        const dialogRef = this.dialog.open(DeviceFilterDialogComponent, {

            data: this.filter.device
        });

        dialogRef.afterClosed().subscribe(() => {

            this.filter.device.invoke();
        });
    }

    public changeLanguage(value: string): string {

        this.languageActionDelay_ms += 1000;

        if (value === Language.It) {
            this.commonService.appSettings.language = Language.En;
            this.languageAction$.next(Language.En);
            return Language.En;
        }
        else if (value === Language.En) {
            this.commonService.appSettings.language = Language.De;
            this.languageAction$.next(Language.De);
            return Language.De;
        }
        else if (value === Language.De) {
            this.commonService.appSettings.language = Language.Es;
            this.languageAction$.next(Language.Es);
            return Language.Es;
        }
        else if (value === Language.Es) {
            this.commonService.appSettings.language = Language.Fr;
            this.languageAction$.next(Language.Fr);
            return Language.Fr;
        }
        else if (value === Language.Fr) {
            this.commonService.appSettings.language = Language.Ru;
            this.languageAction$.next(Language.Ru);
            return Language.Ru;
        }
        else if (value === Language.Ru) {
            this.commonService.appSettings.language = Language.Cn;
            this.languageAction$.next(Language.Cn);
            return Language.Cn;
        }
        else {
            this.commonService.appSettings.language = Language.It;
            this.languageAction$.next(Language.It);
            return Language.It;
        }
    }

    public enablePolling(value: boolean): void {

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