import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Menu } from '../enums/enums';
import { Auth } from './auth.service';

@Injectable()

export class AuthGuardService implements CanActivate {
    constructor(public authConf: Auth, private router: Router) {
    }

    canActivate(): boolean {
        if (!this.authConf.userIsLogged) {
            this.router.navigate([Menu.Home]);
            return false;
        }
        return true;
    }
}