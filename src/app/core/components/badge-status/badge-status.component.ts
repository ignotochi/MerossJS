import { NgFor, NgIf } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, OnDestroy, OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BadgeService } from 'src/app/services/badge.service';
import { String } from '../../../utils/helper';
  
@Component({
    standalone: true,
    selector: 'badgeStatus',
    templateUrl: './badge-status.component.html',
    styleUrls: ['./badge-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.Default,
    imports: [MatButtonModule, NgIf, NgFor],
})

export class BadgeStatus implements OnInit, AfterViewInit, OnDestroy {

    public messages: string[] = [];
    private expiry: number = 5000;

    public showSuccessBadge: boolean = false;
    public showErrorBadge: boolean = false;
    public showWarningBadge: boolean = false;

    public showBadge: boolean = false;

    constructor(private cd: ChangeDetectorRef, private badgeService: BadgeService) {
    }

    ngOnInit() {
        this.successSubscription();
        this.errorSubscription();
        this.warningSubscription();
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
    }

    successSubscription(): void {
        this.badgeService.showSuccess.subscribe((msg) => {
            this.messages.push(msg);
            this.showSuccessBadge = true;

            setTimeout(() => {
                this.showSuccessBadge = false; 
                this.messages = [];
                this.cd.markForCheck();
            }, this.expiry);
        });
    }

    warningSubscription(): void {
        this.badgeService.showWarning.subscribe((msg) => {
            this.messages.push(msg);
            this.showWarningBadge = true;
           
            setTimeout(() => {
                this.showWarningBadge = false; 
                this.messages = [];
                this.cd.markForCheck();
            }, this.expiry);
        });
    }

    errorSubscription(): void {
        this.badgeService.showError.subscribe((msg) => {
            this.messages.push(msg);
            this.showErrorBadge = true;

            setTimeout(() => {
                this.showErrorBadge = false;
                this.messages = [];
                this.cd.markForCheck();
            }, this.expiry);
        });
    }
}