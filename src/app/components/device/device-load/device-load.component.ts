import { NgFor, NgIf } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from "@angular/core";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { IDevice } from "src/app/interfaces/IDevice";
import { IDeviceFilter } from "src/app/interfaces/IDeviceFilter";
import { BadgeService } from "src/app/services/badge.service";
import { DeviceService } from "src/app/services/device.service";
import { SwitchMerossDevice } from "../device-switch/device-switch.component";
import { BadgeStatus } from 'src/app/core/components/badge-status/badge-status.component';
import { MSS_310H, MSS_710 } from "src/app/device-constants";
import { SharedModule } from "src/app/shared.module";
import { DevicePollingComponent } from "../../../directives/device-polling/device-polling.directive";
import { Auth } from "src/app/services/auth.service";
import { FilterService } from "src/app/services/filter.service";
import { FilterName } from "src/app/enum/enums";
import { FilterType } from "src/app/types/custom-types";
import { IFilter } from "src/app/interfaces/IFilter";


@Component({
  standalone: true,
  selector: 'device-load',
  templateUrl: './device-load.component.html',
  styleUrls: ['./device-load.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgFor, SwitchMerossDevice, MatGridListModule, MatProgressBarModule, SharedModule, BadgeStatus, DevicePollingComponent],
})

export class LoadMerossDevice implements OnInit, OnDestroy, AfterViewInit {

  public showLoader: boolean = true;
  public datasource: IDevice[] = [] as IDevice[];

  private deviceFilter: Record<FilterName.Device, IDeviceFilter> = {

    device: {
      models: [{ model: MSS_310H }, { model: MSS_710 }],
      uid: -1,
      name: FilterName.Device,
      invoke: () => this.LoadDevices(this.deviceFilter.device)
    }
  };

  constructor(private auth: Auth, private deviceService: DeviceService, private cd: ChangeDetectorRef, private badgeService: BadgeService,
    private filterService: FilterService<Record<FilterName, IFilter>>) {

    this.filterService.register(this.deviceFilter);
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
    this.LoadDevices(this.deviceFilter.device);
  }

  private LoadDevices(deviceFilter: IDeviceFilter): void {

    this.showLoader = true;
    this.cd.markForCheck();

    this.deviceService.loadMerossDevices(deviceFilter).subscribe({

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