import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorAuth } from '../core/detectors/AuthDetector.service';
import { Menu } from '../enums/enums';
import { MerossLoginService } from './login.service';
import { isNullOrEmptyString, String } from '../utils/helper';
import { lastValueFrom } from 'rxjs';
import { Token } from '../core/constants';

@Injectable({ providedIn: 'root' })

export class Auth {
    public errorLogin: string = String.Empty;
    public userIsLogged = (async () => { return await this.userLoggedIn() });

    constructor(private router: Router, private authDetector: ChangeDetectorAuth, private loginService: MerossLoginService) {
    }

    private saveSession(token: string) {
        if (!isNullOrEmptyString(token))
            localStorage.setItem(Token, token);
    }

    public getLocalToken(): string {
        return localStorage.getItem(Token) ?? String.Empty;
    }

    private async userLoggedIn(): Promise<boolean> {

        const localToken = this.getLocalToken();
        const laodedToken = await this.validateLocalToken(localToken)
        const isValidLocalToken: boolean = localToken === laodedToken && !isNullOrEmptyString(localToken);

        if (!isValidLocalToken)
            localStorage.setItem(Token, String.Empty);

        return isValidLocalToken;
    }

    public destroySession() {
        localStorage.setItem(Token, String.Empty);
        this.authDetector.compleDataChanges();
        this.router.navigate([Menu.Base]);
    }

    private async validateLocalToken(localToken: string): Promise<string> {

        let loadedToken: string = String.Empty;
        const source = this.loginService.validateLocalToken(localToken);

        await lastValueFrom(source).then((value) => {
            loadedToken = value.token;
        })
            .catch((error) => {
                console.log(error);
            });

        return loadedToken;
    }

    public login(username: string, password: string): void {
        try {
            this.loginService.login(username, password)
                .subscribe({
                    next: (data) => {
                        if (!isNullOrEmptyString(data.token)) {
                            this.saveSession(data.token);
                            this.authDetector.setToken(data.token);
                        }
                    },
                    error: (error) => {
                        this.errorLogin = error.statusText;
                        this.destroySession();
                    },
                    complete: () => {
                        if (this.getLocalToken().length > 0)
                            console.log("user logged in");
                    }
                });
        }
        catch (err) {
            console.log(err);
        }
    }

    public logout(): void {
        try {
            this.loginService.logout(this.getLocalToken())

                .subscribe({
                    next: (data) => {
                        if (!isNullOrEmptyString(data.logout === true)) {
                            this.destroySession();
                        }
                    },
                    error: (error) => {
                        this.errorLogin = error.statusText;
                        this.destroySession();
                    },
                    complete: () => {
                        this.router.navigate([Menu.Base]);
                        setTimeout(() => {
                            location.reload();
                        }, 800);
                    }
                });
        }
        catch (err) {
            console.log(err);
        }
    }
}