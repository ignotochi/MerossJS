import {
  AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { authActions, Menu } from './enums/enums';
import { isNullOrEmptyString, String } from './utils/helper';
import { ChangeDetectorAuth } from './core/detectors/AuthDetector.service';
import { MerossLoginService } from './services/login.service';

@Component({
  selector: 'merossApp',
  templateUrl: './merossApp.component.html',
  styleUrls: ['./merossApp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MerossApp implements OnInit, AfterViewInit, OnDestroy {
  selectedTab: number = 0;

  public title = "MerossJS";
  private auth$: any;
  public userAuthenticated: boolean = false;

  constructor(private authDetector: ChangeDetectorAuth, public router: Router, public auth: Auth, private loginService: MerossLoginService) {

    this.auth$ = this.authDetector.getDataChanges().pipe(filter(tt => tt.action === authActions.token)).subscribe((result) => {
      this.userAuthenticated = !isNullOrEmptyString(result.payload.token) ? true : false;
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnDestroy(): void {
      this.auth$.unsubscribe();
  }

  tabNavigation(tabIndex: number): void {
    switch (tabIndex) {
      
      case 0:
        this.navigationPath(Menu.Home);
        break;
    }
  }

  navigationPath(menuSelected: Menu): void {
    
    let path: string = String.Empty;
    
    switch (menuSelected) {
      case Menu.Home:
        path = Menu.Home;
        break;

      default:
        break;
    }
    this.router.navigate([path]);
  }

}