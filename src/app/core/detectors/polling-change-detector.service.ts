import { Injectable } from "@angular/core";
import { pollingAction} from "src/app/enum/enums";
import { DataStoreDetector } from "./data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class PollingChangeDetectorService extends DataStoreDetector<boolean, pollingAction> {
    
    enabled(enabled: boolean) {
        this.updateDataChanges({ action: pollingAction.Enabled, payload: enabled });
    }
}