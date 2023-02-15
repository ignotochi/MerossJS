import { NgFor, NgIf } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, OnDestroy, OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Badge } from 'src/app/enums/enums';
import { BadgeService } from 'src/app/services/badge.service';

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
        this.badgeSubscription();
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
    }

    badgeSubscription(): void {
        this.badgeService.badge.subscribe((item) => {

            this.messages.push(item.msg);

            if (item.type === Badge.Success)
                this.showSuccessBadge = true;

            if (item.type === Badge.Warning)
                this.showSuccessBadge = true;

            if (item.type === Badge.Error)
                this.showSuccessBadge = true;

            setTimeout(() => {
                this.showSuccessBadge = false;
                this.messages = [];
                this.cd.markForCheck();
            }, this.expiry);
        });
    }
}