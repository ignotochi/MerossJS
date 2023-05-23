import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonComponentModules } from './components/components.module';
import { ChangeDetectorAuth } from './core/detectors/AuthDetector.service';
import { MerossApp } from './meross-app.component';
import { AuthGuardService as AuthGuard, AuthGuardService } from './services/auth-guard.service';
import { Auth } from './services/auth.service';
import { MerossLoginService } from './services/login.service';

@NgModule({
  declarations: [
    MerossApp
  ],

  imports: [
    RouterModule.forRoot([
      {
        path: 'home',
        loadChildren: () => import('./components/home/home.module').then(tt => tt.MerossHomeModule),
        canActivate: [AuthGuard] 
      },
      {
        path: '',
        loadChildren: () => import('./components/login/login.module').then(tt => tt.MerossLoginModule),
      }
    ], { useHash: true }),
    
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonComponentModules
  ],
  bootstrap: [MerossApp],
  providers: [Auth, AuthGuardService, ChangeDetectorAuth, MerossLoginService],
  exports: [RouterModule]
})
export class MerossMainModule { }

