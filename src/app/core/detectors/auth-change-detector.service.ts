import { Injectable } from "@angular/core";
import { authAction} from "src/app/enum/enums";
import { ILogin } from "src/app/interfaces/ILogin";
import { DataStoreDetector } from "./data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class AuthChangeDetectorService extends DataStoreDetector<ILogin, authAction> {

    setAll(input: ILogin) {
        this.updateDataChanges({ action: authAction.All, payload: input });
    }
    
    setToken(token: string) {
        this.updateDataChanges({ action: authAction.token, payload: { ...this.getClonedDataChange(), token: token } });
    }

}