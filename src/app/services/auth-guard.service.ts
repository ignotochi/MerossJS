import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Menu } from '../enum/enums';
import { Auth } from './auth.service';

@Injectable()

export class AuthGuardService implements CanActivate {
    constructor(public authConf: Auth, private router: Router) {
    }

    async canActivate(): Promise<boolean> {

        const userIsLogged: boolean = await this.authConf.userIsLogged();

        if (!userIsLogged) {
            this.router.navigate([Menu.Login]);
            return false;
        }

        return true;
    }
}