import { NgIf } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, OnDestroy, OnInit } from "@angular/core";
import { String } from '../../utils/helper';
import { MatButtonModule } from "@angular/material/button";
import { IToggleDevicesFilter } from "../../interfaces/IToggleDevices";
import { DeviceService } from "src/app/services/device.service";
import { BadgeService } from "src/app/services/badge.service";


@Component({
    standalone: true,
    selector: 'toggle-device',
    templateUrl: './toggle-device.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports:[NgIf, MatButtonModule]
  })

export class ToggleMerossDevice implements OnInit, OnDestroy, AfterViewInit { 

     @Input() device = { uid: String.Empty, enabled: false };
     @Output() toggled = new EventEmitter<boolean>();

    constructor(private deviceService: DeviceService, private cd: ChangeDetectorRef, private badgeService: BadgeService) {}

    ngOnInit(): void {
        
    }

    ngOnDestroy(): void {
        
    }

    ngAfterViewInit(): void {
        
    }

    toggleDevice(toggled: boolean) {

      this.device.enabled = toggled;

      const filters: IToggleDevicesFilter[] = [];
      filters.push({deviceId: this.device.uid, enabled: this.device.enabled});

      try {
        this.deviceService.toggleDevice(filters).subscribe({
          next: (data) => {
            
            const toggledDevice = data.find(item => item.deviceUid === this.device.uid);

            if (data.length > 0 && toggledDevice) {
              this.toggled.emit(toggledDevice.active);
              this.badgeService.showSuccessBadge("stato dispositivo cambiato con successo");
              this.cd.markForCheck();
            }
          },
          error: (error) => {
            this.badgeService.showErrorBadge(error.error)
            this.cd.markForCheck();
          }
        });
      }
      catch (error) {
        console.log(error);
      }
    }
}

