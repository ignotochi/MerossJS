import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadMerossDevices } from './load-devices/load-devices.component';
import { ToggleMerossDevice } from './toggle-device/toggle-device.component';
import { DeviceService } from '../services/device.service';
import { BadgeStatus } from '../core/components/badge-status/badge-status.component';
import { BadgeService } from '../services/badge.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
  ],

  imports: [
    CommonModule, 
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    
    MatToolbarModule,
    BadgeStatus,
    LoadMerossDevices, 
    ToggleMerossDevice
   ],

  exports: [FormsModule, CommonModule, MatButtonModule, MatInputModule, MatTabsModule, MatToolbarModule, MatMenuModule,
            MatButtonToggleModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule],
  providers: [DeviceService, BadgeService]
})
export class CommonComponentModules { }


