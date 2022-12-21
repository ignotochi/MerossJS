import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorAuth } from '../core/detectors/AuthDetector.service';
import { Menu } from '../enums/enums';
import { MerossLoginService } from './login.service';
import { isNullOrEmptyString, String } from '../utils/helper';
import { switchMap } from 'rxjs';
import { IConf } from '../interfaces/Iconf';


@Injectable()

export class Auth {
    public userIsLogged: boolean = false;
    public errorLogin: string = String.Empty;

    constructor(private router: Router, private authDetector: ChangeDetectorAuth, private loginService: MerossLoginService) {
        this.setSession();
    }

    private setSession() {
    }

    private saveSession(token: string) {
        localStorage.setItem("token", token);
    }

    public destroySession() {
        localStorage.setItem("accessToken", String.Empty);
        this.authDetector.compleDataChanges();
        this.router.navigate([Menu.Home]);
    }

    public login(username: string, password: string): void {
        try {
            this.loginService.loadConfigurationFile().pipe(
                switchMap((conf: IConf) => {
                    this.loginService.appSettings = conf;
                    return this.loginService.login(username, password);
                }))
                .subscribe({
                    next: (data) => {
                        if (!isNullOrEmptyString(data.token)) {
                            this.userIsLogged = !isNullOrEmptyString(data.token) ? true : false;
                            this.saveSession(data.token);
                            this.authDetector.setToken(data.token);
                        }
                    },
                    error: (error) => {
                        this.userIsLogged = false;
                        this.errorLogin = error.statusText;
                    },
                    complete: () => {
                        if (this.userIsLogged)
                            console.log("user logged in");
                    }
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    public logOutZm() {
        this.userIsLogged = false;
        this.destroySession();
        this.router.navigate([Menu.Home]);
        location.reload();
    }
}