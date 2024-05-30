import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthChangeDetectorService } from '../core/detectors/auth-change-detector.service';
import { Menu } from '../enum/enums';
import { isNullOrEmptyString, String } from '../utils/helper';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { CommonService } from './common.service';
import { Token } from '../core/constants';
import { IConfiguration } from '../interfaces/IConfiguration';
import { MerossLoginService } from '../components/login-component/login.service';


@Injectable({ providedIn: 'root' })

export class Auth {

    public errorLogin: string = String.Empty;

    constructor(private readonly router: Router, private readonly authDetector: AuthChangeDetectorService, private readonly loginService: MerossLoginService) {
    }

    private saveSession(token: string) {

        if (!isNullOrEmptyString(token)) {
            localStorage.setItem(Token, token);
        }
    }

    public getLocalToken(): string {
        return localStorage.getItem(Token) ?? String.Empty;
    }

    public async userIsLogged(): Promise<boolean> {

        const localToken = this.getLocalToken();
        const laodedToken = await this.validateLocalToken(localToken)
        const isValidLocalToken: boolean = localToken === laodedToken && !isNullOrEmptyString(localToken);

        if (!isValidLocalToken)
            localStorage.setItem(Token, String.Empty);

        return isValidLocalToken;
    }

    public destroySession() {
        localStorage.setItem(Token, String.Empty);
        this.authDetector.setToken(String.Empty);
    }

    private async validateLocalToken(localToken: string): Promise<string> {

        let loadedToken: string = String.Empty;

        if (!isNullOrEmptyString(localToken)) {

            const source = this.loginService.validateLocalToken(localToken);

            await lastValueFrom(source).then((value) => loadedToken = value.token)
                .catch((error) => {
                    console.log(error);
                });
        }

        return loadedToken;
    }

    public login(username: string, password: string): void {

        this.loginService.login(username, password)

            .subscribe({
                next: (data) => {
                    if (!isNullOrEmptyString(data.token)) {
                        this.saveSession(data.token);
                        this.authDetector.setToken(data.token);
                    }
                },
                error: (error) => {
                    this.errorLogin = error.message;
                    this.destroySession();
                },
                complete: () => {
                    if (this.getLocalToken().length > 0)
                        console.log("user logged in");
                }
            });
    }

    public logout(): void {

        this.loginService.logout(this.getLocalToken())

            .subscribe({
                next: (data) => {
                    if (!isNullOrEmptyString(data.logout === true)) {
                        this.destroySession();
                    }
                },
                error: (error) => {
                    this.errorLogin = error.message;
                    this.destroySession();
                },
                complete: () => {
                    this.router.navigate([Menu.Login]);
                }
            });
    }
}