import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BadgeService } from '../core/components/badge.service';
import { TranslatePipe } from '../pipes/translate.pipe';
import { TranslatorService } from '../services/translator.service';
import { DeviceService } from './device-components/device.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


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
   ],

  exports: [FormsModule, CommonModule, MatButtonModule, MatInputModule, MatTabsModule, MatToolbarModule, MatMenuModule,
            MatButtonToggleModule, MatIconModule, MatDialogModule, MatProgressSpinnerModule],
  providers: [DeviceService, BadgeService, TranslatePipe, TranslatorService]
})
export class CommonMatModules { }


