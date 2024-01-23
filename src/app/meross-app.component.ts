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

  constructor(private authDetector: ChangeDetectorAuth, public router: Router, public auth: Auth) {

    this.authDetector.getDataChanges().pipe(filter(tt => tt.action === authActions.token))

      .subscribe((result) => {
        (async () => {
          let userLoggedIn: boolean = false;

          userLoggedIn = !isNullOrEmptyString(result.payload.token);
          this.loadHomePageIfLoggedIn(!isNullOrEmptyString(result.payload.token));

          userLoggedIn = await this.auth.userIsLogged();
          this.loadHomePageIfLoggedIn(userLoggedIn);
        })();
      });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  loadHomePageIfLoggedIn(userAthenticated: boolean): void {
    if (userAthenticated) {
      this.router.navigate([Menu.Home]);
    }
    else {
      this.router.navigate([Menu.Login]);
    }
  }

  ngOnDestroy(): void {
  }
}