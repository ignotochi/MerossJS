import { Component, Inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from "@angular/material/input";
import { IDeviceFilter } from "src/app/interfaces/IDeviceFilter";
import { SharedModule } from "src/app/shared.module";
import {
  MSS_310H, MSS_710, MSL_120, MSS_110, MSS_210, MSS_10,
  MSS_530H, MSS_425E, MSG_100, MSG_200, MSH_300, MS_100, MSXH_0
} from "src/app/device-constants";
import { NgFor } from "@angular/common";
import { FilterName } from "src/app/enum/enums";

@Component({
  standalone: true,
  selector: 'device-filter',
  templateUrl: './device-filter.component.html',
  styleUrls: ['./device-filter.component.scss'],
  imports: [SharedModule, NgFor, MatButtonModule, MatChipsModule, MatInputModule, MatDialogModule],
})

export class DeviceFilterDialogComponent {

  public readonly devicesList: string[] = []

  constructor(public dialogRef: MatDialogRef<DeviceFilterDialogComponent>, @Inject(MAT_DIALOG_DATA) public deviceFilter: Record<FilterName, IDeviceFilter>) {
    this.devicesList.push(MSS_310H, MSS_710, MSL_120, MSS_110, MSS_210, MSS_10, MSS_530H, MSS_425E, MSG_100, MSG_200, MSH_300, MS_100, MSXH_0);
  }

  public toggle(device: string): void {

    const index = this.deviceFilter.device.models.findIndex(filter => filter.model === device);

    if (index == -1) {
      this.deviceFilter.device.models.push({ model: device });
    }
    else {
      this.deviceFilter.device.models.splice(index, 1);
    }
  }

  chipIsSelected(device: string): boolean {
    const index = this.deviceFilter.device.models.findIndex(deviceFilter => deviceFilter.model === device);
    return index !== -1;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}