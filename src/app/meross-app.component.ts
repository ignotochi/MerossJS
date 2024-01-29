import {
  AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { authAction, Menu } from './enum/enums';
import { AuthChangeDetectorService } from './core/detectors/auth-change-detector.service';
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

  constructor(private authDetector: AuthChangeDetectorService, public router: Router, public auth: Auth) {

    this.authDetector.getDataChanges().pipe(filter(tt => tt.action === authAction.token))

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
      setTimeout(() => {
        if (location.origin != Menu.Login) {
            this.router.navigate([Menu.Login]);
        }
    }, 1500);
    }
  }

  ngOnDestroy(): void {
    this.authDetector.compleDataChanges();
  }
}