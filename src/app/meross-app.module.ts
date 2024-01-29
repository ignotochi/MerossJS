import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonComponentModules } from './components/components.module';
import { AuthChangeDetectorService } from './core/detectors/auth-change-detector.service';
import { MerossApp } from './meross-app.component';
import { AuthGuardService as AuthGuard, AuthGuardService } from './services/auth-guard.service';
import { Auth } from './services/auth.service';
import { MerossLoginService } from './services/login.service';
import { I18nService } from './services/i18n.service';
import { APP_BASE_HREF } from '@angular/common';

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
        loadChildren: () => import('./components/home/home.module').then(tt => tt.MerossHomeModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        loadChildren: () => import('./components/login/login.module').then(tt => tt.MerossLoginModule),
      }
    ], { onSameUrlNavigation: 'reload'}),

    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonComponentModules
  ],
  bootstrap: [MerossApp],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, Auth, AuthGuardService, AuthChangeDetectorService, MerossLoginService, I18nService],
  exports: [RouterModule]
})
export class MerossMainModule { }

