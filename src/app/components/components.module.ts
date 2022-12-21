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

@NgModule({
  declarations: [
    LoadMerossDevices, ToggleMerossDevice
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],

  exports: [FormsModule, CommonModule, MatButtonModule, MatInputModule, MatTabsModule, MatButtonToggleModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule]
})
export class CommonComponentModules { }


