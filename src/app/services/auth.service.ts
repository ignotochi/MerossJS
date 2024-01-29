import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthChangeDetectorService } from '../core/detectors/auth-change-detector.service';
import { Menu } from '../enum/enums';
import { MerossLoginService } from './login.service';
import { isNullOrEmptyString, String } from '../utils/helper';
import { lastValueFrom, switchMap } from 'rxjs';
import { CommonService } from './common.service';
import { Settings, Token } from '../core/constants';
import { IConfiguration } from '../interfaces/IConfiguration';


@Injectable({ providedIn: 'root' })

export class Auth {
    
    public errorLogin: string = String.Empty;

    constructor(private router: Router, private authDetector: AuthChangeDetectorService, private commonService: CommonService, private loginService: MerossLoginService) {
    }

    private saveSession(token: string, settings?: IConfiguration) {

        if (!isNullOrEmptyString(token)) {
            localStorage.setItem(Token, token);
        }          
        if (settings) {
            localStorage.setItem(Settings, JSON.stringify(settings));
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

        this.commonService.loadConfigurationFile()
            .pipe(
                switchMap((conf: IConfiguration) => {
                    this.commonService.appSettings = conf;
                    this.saveSession(String.Empty, conf);
                    return this.loginService.login(username, password);
                }))
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