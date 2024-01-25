import { Injectable } from "@angular/core";
import { pollingActions} from "src/app/enums/enums";
import { DataStoreDetector } from "./data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class PollingChangeDetectorService extends DataStoreDetector<boolean, pollingActions> {
    
    enabled(enabled: boolean) {
        this.updateDataChanges({ action: pollingActions.Enabled, payload: enabled });
    }
}