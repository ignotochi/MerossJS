import {
  AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { AuthAction, Menu } from './enum/enums';
import { AuthChangeDetectorService } from './core/detectors/auth-change-detector.service';
import { isNullOrEmptyString } from './utils/helper';
import { Subscription } from 'rxjs';


@Component({
  selector: 'merossApp',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: []
})

export class MerossApp implements OnInit, AfterViewInit, OnDestroy {

  public readonly title = "MerossJS";
  private readonly dataChange$: Subscription;

  constructor(private readonly authDetector: AuthChangeDetectorService, public readonly router: Router, public readonly auth: Auth) {

    this.dataChange$ = this.authDetector.changes().pipe(filter(tt => tt.action === AuthAction.token))

      .subscribe((result) => {
        (async () => {
          const userLoggedIn: boolean = !isNullOrEmptyString(result.payload.token);
          this.loadHomePageIfLoggedIn(userLoggedIn);
        })();
      });
  }

  async ngOnInit() {
    const userLoggedIn: boolean = await this.auth.userIsLogged();
    this.loadHomePageIfLoggedIn(userLoggedIn);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
    this.authDetector.complete();
    this.dataChange$.unsubscribe();
  }

  private loadHomePageIfLoggedIn(userAthenticated: boolean): void {

    if (userAthenticated) {
      this.router.navigate([Menu.Home]);
    }
    else {
      this.router.navigate([Menu.Login]);
    }
  }
}