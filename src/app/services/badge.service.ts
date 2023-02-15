import { AfterViewInit, EventEmitter, Injectable, OnDestroy, OnInit } from "@angular/core";
import { Badge } from "../enums/enums";

@Injectable()

export class BadgeService implements OnInit, AfterViewInit, OnDestroy {

    public badge = new EventEmitter<{type: Badge, msg: string}>();

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    showErrorBadge(message: string): void {
        this.badge.emit({type: Badge.Error, msg: message});
    }

    showSuccessBadge(message: string): void {
        this.badge.emit({type: Badge.Error, msg: message});
    }

    showWarningBadge(message: string): void {
        this.badge.emit({type: Badge.Error, msg: message});
    }
}
