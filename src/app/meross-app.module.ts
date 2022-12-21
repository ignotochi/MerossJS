import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonComponentModules } from './components/components.module';
import { ChangeDetectorAuth } from './core/detectors/AuthDetector.service';
import { MerossApp } from './merossApp.component';
import { AuthGuardService as AuthGuard, AuthGuardService } from './services/auth-guard.service';
import { Auth } from './services/auth.service';
import { MerossLoginService } from './services/login.service';

@NgModule({
  declarations: [
    MerossApp
  ],

  imports: [
    RouterModule.forRoot([
      // {
      //   path: 'loaddevices',
      //   loadChildren: () => import('./components/load-devices/load-devices.component').then(tt => tt.LoadMerossDevices),
      //   canActivate: [AuthGuard]
      // },
      // {
      //   path: 'toggledevice',
      //   loadChildren: () => import('./components/toggle-device/toggle-device.component').then(tt => tt.ToggleMerossDevice),
      //   canActivate: [AuthGuard]
      // }
    ]),
    
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

