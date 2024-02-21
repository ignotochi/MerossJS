import { NgFor, NgIf } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { IDevice } from "src/app/interfaces/IDevice";
import { IDeviceFilter } from "src/app/interfaces/IDeviceFilter";
import { BadgeService } from "src/app/core/components/badge.service";
import { BadgeStatus } from 'src/app/core/components/badge-status/badge-status.component';
import { MSS_310H, MSS_710 } from "src/app/device-constants";
import { SharedModule } from "src/app/shared.module";
import { DevicePollingComponent } from "../../../directives/device-polling/device-polling.directive";
import { Auth } from "src/app/services/auth.service";
import { FilterName } from "src/app/enum/enums";
import { SwitchMerossDevice } from "../device-switch-component/device-switch.component";
import { DeviceService } from "../device.service";
import { BaseFilterComponent } from "src/app/core/base-components/base-filter/base-filter.component";
import { DeviceFilter } from "src/app/types/filter-types";


@Component({
  standalone: true,
  selector: 'device-load',
  templateUrl: './device-load.component.html',
  styleUrls: ['./device-load.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, SwitchMerossDevice, MatGridListModule, MatProgressBarModule, SharedModule, BadgeStatus, DevicePollingComponent],
})

export class LoadMerossDevice extends BaseFilterComponent<DeviceFilter> implements OnInit, AfterViewInit {

  public showLoader: boolean = true;
  public datasource: IDevice[] = [] as IDevice[];

  constructor(private auth: Auth, private deviceService: DeviceService, private cd: ChangeDetectorRef, private badgeService: BadgeService) {
    super({
      device: {
        models: [{ model: MSS_310H }, { model: MSS_710 }],
        uid: -1,
        owner: LoadMerossDevice.name,
        name: FilterName.Device,
        invoke: () => this.LoadMerossDevices()
      }
    });
  }

  ngOnInit(): void {
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
    this.LoadMerossDevices();
  }

  private LoadMerossDevices(): void {

    this.showLoader = true;
    this.cd.markForCheck();

    this.deviceService.loadMerossDevices(this.filter.device).subscribe({

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
        this.showLoader = false;
      }
    });
  }
}