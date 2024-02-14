import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonMatModules } from './components/components.module';
import { AuthChangeDetectorService } from './core/detectors/auth-change-detector.service';
import { MerossApp } from './meross-app.component';
import { AuthGuardService } from './services/auth-guard.service';
import { Auth } from './services/auth.service';
import { I18nService } from './services/i18n.service';
import { APP_BASE_HREF } from '@angular/common';
import { MerossLoginService } from './components/login-component/login.service';

@NgModule({
  declarations: [
    MerossApp
  ],

  imports: [
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'home',
        loadComponent: () => import('./components/home-component/meross-home.component').then(tt => tt.MerossHome),
        canActivate: [AuthGuardService]
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login-component/meross-login.component').then(tt => tt.MerossLogin),
      }
    ], { onSameUrlNavigation: 'reload', useHash: true}),

    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonMatModules
  ],
  bootstrap: [MerossApp],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }, 
    Auth, AuthGuardService, AuthChangeDetectorService, MerossLoginService, I18nService],
  exports: [RouterModule]
})
export class MerossMainModule { }

