import { AfterViewInit, EventEmitter, Injectable, OnDestroy, OnInit } from "@angular/core";
import { Badge } from "../enums/enums";
import { TranslatePipe } from "../pipes/translate.pipe";

@Injectable()

export class BadgeService implements OnInit, AfterViewInit, OnDestroy {

    public badge;

    constructor(private translatePipe: TranslatePipe) {
        this.badge = new EventEmitter<{type: Badge, msg: string}>();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    showErrorBadge(message: string): void {
        this.badge.emit({type: Badge.Error, msg: this.translate(message)});
    }

    showSuccessBadge(message: string): void {
        this.badge.emit({type: Badge.Success, msg: this.translate(message)});
    }

    showWarningBadge(message: string): void {
        this.badge.emit({type: Badge.Warning, msg: this.translate(message)});
    }

    private translate(message: string): string {

        const translation = this.translatePipe.transform(message);
        return translation;
    }
}
