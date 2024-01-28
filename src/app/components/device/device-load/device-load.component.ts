import { NgFor, NgIf } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { IDevice } from "src/app/interfaces/IDevice";
import { IDevicesFilter } from "src/app/interfaces/IDevicesFilter";
import { BadgeService } from "src/app/services/badge.service";
import { DeviceService } from "src/app/services/device.service";
import { SwitchMerossDevice } from "../device-switch/device-switch.component";
import { BadgeStatus } from 'src/app/core/components/badge-status/badge-status.component';
import { MSS_310H, MSS_710 } from "src/app/constants";
import { SharedModule } from "src/app/shared.module";
import { DevicePollingComponent } from "../../../directives/device-polling/device-polling.directive";
import { Menu } from "src/app/enums/enums";
import { Auth } from "src/app/services/auth.service";

@Component({
  standalone: true,
  selector: 'device-load',
  templateUrl: './device-load.component.html',
  styleUrls: ['./device-load.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, SwitchMerossDevice, MatGridListModule, MatProgressBarModule, SharedModule, BadgeStatus, DevicePollingComponent]
})

export class LoadMerossDevice implements OnInit, OnDestroy, AfterViewInit {

  public showLoader: boolean = true;
  public datasource: IDevice[] = [] as IDevice[];
  public devicesSearch: IDevicesFilter[] = [];

  constructor(private auth: Auth, private deviceService: DeviceService, private cd: ChangeDetectorRef, private badgeService: BadgeService) {
    this.devicesSearch.push({ model: MSS_710 }, { model: MSS_310H });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  setColsGrid(): number {

    if (this.datasource.length > 4 && this.datasource.length <= 8)
      return 4;

    if (this.datasource.length > 8 && this.datasource.length <= 16)
      return 8;

    if (this.datasource.length > 16)
      return 8;

    else
      return 4
  }

  ngAfterViewInit() {

    this.deviceService.loadMerossDevices(this.devicesSearch).subscribe({

      next: (data) => {
        if (data.length > 0) {
          this.showLoader = false;
          this.datasource = data;
          this.cd.markForCheck();
        }
      },
      error: (error) => {
        this.showLoader = false;
        this.badgeService.showErrorBadge(error.error)
        this.cd.markForCheck();
        this.auth.destroySession();
      },
      complete: () => {
        if (this.datasource.length > 0) {
          this.badgeService.showSuccessBadge("DevicesLoadedWithSuccess");
        }
      }
    });
  }
}