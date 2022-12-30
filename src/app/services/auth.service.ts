import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorAuth } from '../core/detectors/AuthDetector.service';
import { Menu } from '../enums/enums';
import { MerossLoginService } from './login.service';
import { isNullOrEmptyString, String } from '../utils/helper';
import { lastValueFrom, switchMap } from 'rxjs';
import { IConf } from '../interfaces/IConf';
import { CommonService } from './common.service';
import { Settings, Token } from '../core/constants';



@Injectable({ providedIn: 'root' })

export class Auth {
    public errorLogin: string = String.Empty;
    public userIsLogged = (async()=>{ return await this.userLoggedIn() });

    constructor(private router: Router, private authDetector: ChangeDetectorAuth, private commonService: CommonService, private loginService: MerossLoginService) {
    }

    private saveSession(token: string, settings?: IConf) {
        if (!isNullOrEmptyString(token))
            localStorage.setItem(Token, token);

        if (settings)
            localStorage.setItem(Settings, JSON.stringify(settings));
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
        this.router.navigate([Menu.Login]);
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
            this.commonService.loadConfigurationFile().pipe(
                switchMap((conf: IConf) => {
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

    public logOutZm() {
        this.destroySession();
        this.router.navigate([Menu.Login]);
        location.reload();
    }
}