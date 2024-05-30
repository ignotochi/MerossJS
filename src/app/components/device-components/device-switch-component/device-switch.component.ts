import { NgIf } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, OnDestroy, OnInit } from "@angular/core";
import { String } from '../../../utils/helper';
import { MatButtonModule } from "@angular/material/button";
import { IToggleDevicesFilter } from "../../../interfaces/IToggleDevices";
import { BadgeService } from "src/app/core/components/badge.service";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SharedModule } from "src/app/shared.module";
import { Auth } from "src/app/services/auth.service";
import { DeviceService } from "../device.service";

@Component({
  standalone: true,
  selector: 'device-switch',
  templateUrl: './device-switch.component.html',
  styleUrls: ['./device-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SharedModule, NgIf, MatButtonModule, MatProgressSpinnerModule]
})

export class SwitchMerossDevice implements OnInit, OnDestroy, AfterViewInit {

  public showSwitchBtn = true;
  public showSpinner = false;
  public buttonMessage: string = String.Empty;

  @Input() 
  device = { uid: String.Empty, enabled: false };
  
  @Output() 
  toggled = new EventEmitter<boolean>();

  constructor(private readonly auth: Auth, private readonly deviceService: DeviceService, private readonly cd: ChangeDetectorRef, private readonly badgeService: BadgeService) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {
  }

  public toggleDevice(toggled: boolean) {

    this.isLoadingMode();

    const filters: IToggleDevicesFilter[] = [];
    filters.push({ deviceId: this.device.uid, enabled: toggled });

    this.deviceService.toggleDevice(filters).subscribe({
      next: (data) => {

        const toggledDevice = data.find(item => item.deviceUid === this.device.uid);

        if (data.length > 0 && toggledDevice) {
          this.device.enabled = toggledDevice.active
          this.toggled.emit(toggledDevice.active);
          this.isWitchMode();

          this.badgeService.showSuccessBadge("DeviceSwitchedWithSuccess");
          this.cd.markForCheck();
        }
      },
      error: (error) => {
        this.badgeService.showErrorBadge(error.error)
        this.isWitchMode();
        this.cd.markForCheck();
        this.auth.destroySession();
      }
    });
  }

  public isLoadingMode(): void {
    this.showSwitchBtn = false;
    this.showSpinner = true;
  }

  public isWitchMode(): void {
    this.showSpinner = false;
    this.showSwitchBtn = true;
  }
}

