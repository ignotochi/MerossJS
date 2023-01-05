import {
    AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Auth } from 'src/app/services/auth.service';

@Component({
    selector: 'merossLogin',
    templateUrl: './meross-login.component.html',
    styleUrls: ['./meross-login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerossLogin implements OnInit, AfterViewInit, OnDestroy {
    constructor(public auth: Auth) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
    }

    ngOnDestroy(): void {
    }
}