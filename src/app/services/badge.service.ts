import { AfterViewInit, EventEmitter, Injectable, OnDestroy, OnInit } from "@angular/core";

@Injectable()

export class BadgeService implements OnInit, AfterViewInit, OnDestroy {

    public showError = new EventEmitter<string>();
    public showSuccess = new EventEmitter<string>();
    public showWarning = new EventEmitter<string>();

    constructor() {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    showErrorBadge(message: string): void {
        this.showError.emit(message);
    }

    showSuccessBadge(message: string): void {
        this.showSuccess.emit(message);
    }

    showWarningBadge(message: string): void {
        this.showWarning.emit(message);
    }
}
