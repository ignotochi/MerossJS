import { Injectable } from "@angular/core";
import { PollingAction} from "src/app/enum/enums";
import { DataStoreDetector } from "./data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class PollingChangeDetectorService extends DataStoreDetector<boolean, PollingAction> {
    
    enabled(enabled: boolean) {
        this.updateDataChanges({ action: PollingAction.Enabled, payload: enabled });
    }
}