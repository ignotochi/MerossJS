import { NgFor, NgIf } from '@angular/common';
import {
    AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Directive, OnDestroy, OnInit
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Badge } from 'src/app/enum/enums';
import { BadgeService } from 'src/app/core/components/badge.service';
import { debounce } from 'src/app/utils/helper';

@Component({
    standalone: true,
    selector: 'badgeStatus',
    templateUrl: './badge-status.component.html',
    styleUrls: ['./badge-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButtonModule, NgIf, NgFor],
})

export class BadgeStatus implements OnInit, AfterViewInit, OnDestroy {

    public readonly queue: Map<number, Map<Badge, string>> = new Map();
    private readonly badgeExpiry: number = 5000;

    public showSuccessBadge: boolean = false;
    public showErrorBadge: boolean = false;
    public showWarningBadge: boolean = false;
    public showBadge: boolean = false;

    private id: number = 0;
    private readonly uid = (() => () => this.id++)();

    constructor(private readonly cd: ChangeDetectorRef, private readonly badgeService: BadgeService) {
    }

    ngOnInit() {
        this.badgeSubscription();
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
    }

    private badgeSubscription(): void {

        this.badgeService.badge.subscribe((item) => {

            const id = this.uid();

            if (item.type === Badge.Success) {
                this.queue.set(id, new Map().set(Badge.Success, item.msg))
                this.showSuccessBadge = true;
            }

            if (item.type === Badge.Warning) {
                this.queue.set(id, new Map().set(Badge.Warning, item.msg))
                this.showWarningBadge = true;
            }

            if (item.type === Badge.Error) {
                this.queue.set(id, new Map().set(Badge.Error, item.msg))
                this.showErrorBadge = true;
            }

            this.cd.markForCheck();

            debounce<number>(this.closeBadgeAfterTime.bind(this), id, this.badgeExpiry);
        });
    }

    private closeBadgeAfterTime(id: number) {

        if (id != null) {
            
            const item = this.queue.get(id);
            const cleanQueue: boolean = this.queue.size === 1;

            for (const [key, value] of (item?.entries() ?? [])) {

                if (!key && !value) { 
                    return; 
                }

                if (cleanQueue) {

                    switch (key) {
                        case Badge.Success:
                            this.showSuccessBadge = false;
                            break;

                        case Badge.Warning:
                            this.showWarningBadge = false;
                            break;

                        case Badge.Error:
                            this.showErrorBadge = false;
                            break;
                    }

                    this.queue.clear();
                }

                this.queue.delete(id);
            }

            this.cd.markForCheck();
        }
    }

    public getMessageFromMap(item: [number, Map<Badge, string>]): string {

        const value = item[1];
        const [badge] = value.entries();
        const message: string = badge[1];

        return message;
    }
}