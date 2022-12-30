import {
  AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { authActions, Menu } from './enums/enums';
import { ChangeDetectorAuth } from './core/detectors/AuthDetector.service';
import { Subscription } from 'rxjs';
import { CommonService } from './services/common.service';
import { isNullOrEmptyString } from './utils/helper';


@Component({
  selector: 'merossApp',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CommonService]
})

export class MerossApp implements OnInit, AfterViewInit, OnDestroy {
  public title = "MerossJS";
  private auth$: Subscription;

  constructor(private authDetector: ChangeDetectorAuth, public router: Router, public auth: Auth) {
    this.redirectIfUserNotLogged();

    this.auth$ = this.authDetector.getDataChanges().pipe(filter(tt => tt.action === authActions.token)).subscribe((result) => {
      this.loadHomePageIfLoggedIn(result.payload.token);    
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  redirectIfUserNotLogged(): void {
    (async () => {
      if (!await this.auth.userIsLogged())
        this.router.navigate([Menu.Login]);
      else
        this.router.navigate([Menu.Home]);
    })();
  }

  loadHomePageIfLoggedIn(token: string): void {
    if (!isNullOrEmptyString(token))
      this.router.navigate([Menu.Home]);
    else
      this.router.navigate([Menu.Login]);
  }

  ngOnDestroy(): void {
    this.auth$.unsubscribe();
  }
}