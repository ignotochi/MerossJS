import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewContainerRef
} from '@angular/core';
import { BadgeStatus } from 'src/app/core/components/badge-status/badge-status.component';
import { Auth } from 'src/app/services/auth.service';
import { BadgeService } from 'src/app/services/badge.service';
import { ChangeDetectorAuth } from 'src/app/core/detectors/AuthDetector.service';
import { filter } from 'rxjs';
import { isNullOrEmptyString } from 'src/app/utils/helper';
import { authActions } from 'src/app/enums/enums';

@Component({
    selector: 'merossLogin',
    templateUrl: './meross-login.component.html',
    styleUrls: ['./meross-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerossLogin implements OnInit, AfterViewInit, OnDestroy {

    public showLoginBtn = true;
    public showSpinner = false;

    constructor(public auth: Auth, private authDetector: ChangeDetectorAuth, private badgeService: BadgeService,
        private containerRef: ViewContainerRef, private cd: ChangeDetectorRef) {

        this.authDetector.getDataChanges().pipe(filter(tt => tt.action === authActions.token))

        .subscribe((result) => {

            if (isNullOrEmptyString(result.payload.token)) {
                this.badgeService.showErrorBadge(this.auth.errorLogin);
                this.isLoginMode();

                this.cd.markForCheck();
            }
        });
    }

    ngOnInit() {
        this.containerRef.createComponent<BadgeStatus>(BadgeStatus);
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