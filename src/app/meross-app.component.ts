import {
  AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { AuthAction, Menu } from './enum/enums';
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

  public readonly title = "MerossJS";

  constructor(private authDetector: AuthChangeDetectorService, public router: Router, public auth: Auth) {

    this.authDetector.getDataChanges().pipe(filter(tt => tt.action === AuthAction.token))

      .subscribe((result) => {

        (async () => {
            const userLoggedIn: boolean = !isNullOrEmptyString(result.payload.token);
            this.loadHomePageIfLoggedIn(userLoggedIn);
        })();
      });
  }

  ngOnInit() {

    (async () => {
      const userLoggedIn: boolean = await this.auth.userIsLogged();
      this.loadHomePageIfLoggedIn(userLoggedIn);
    })();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.authDetector.compleDataChanges();
  }

  private loadHomePageIfLoggedIn(userAthenticated: boolean): void {

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
}