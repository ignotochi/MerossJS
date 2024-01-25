import { NgModule } from "@angular/core";
import { TranslatePipe } from "src/app/pipes/translate.pipe";
import { BadgeStatus } from "./core/components/badge-status/badge-status.component";
import { PollingChangeDetectorService } from "./core/detectors/polling-change-detector.service";

@NgModule({
  imports: [
    BadgeStatus
  ],
  declarations: [
    TranslatePipe
  ],
  providers: [PollingChangeDetectorService],
  exports: [BadgeStatus, TranslatePipe]
})

export class SharedModule { }
