import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef
} from '@angular/core';
import { Auth } from 'src/app/services/auth.service';
import { BadgeService } from 'src/app/services/badge.service';
import { AuthChangeDetectorService } from 'src/app/core/detectors/auth-change-detector.service';
import { filter } from 'rxjs';
import { isNullOrEmptyString } from 'src/app/utils/helper';
import { AuthAction } from 'src/app/enum/enums';

@Component({
    selector: 'meross-login',
    templateUrl: './meross-login.component.html',
    styleUrls: ['./meross-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerossLogin implements OnInit, AfterViewInit, OnDestroy {

    public showLoginBtn = true;
    public showSpinner = false;

    constructor(public auth: Auth, private authDetector: AuthChangeDetectorService, private badgeService: BadgeService, private cd: ChangeDetectorRef) {

        this.authDetector.getDataChanges().pipe(filter(tt => tt.action === AuthAction.token))

        .subscribe((result) => {

            if (isNullOrEmptyString(result.payload.token)) {
                this.badgeService.showErrorBadge(this.auth.errorLogin);
                this.isLoginMode();

                this.cd.markForCheck();
            }
        });
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
    }

    public isLoadingMode(): void {
        this.showLoginBtn = false;
        this.showSpinner = true;
    }

    public isLoginMode(): void {
        this.showSpinner = false;
        this.showLoginBtn = true;
    }
}