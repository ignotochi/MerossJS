import { Injectable } from "@angular/core";
import { authActions} from "src/app/enums/enums";
import { ILogin } from "src/app/interfaces/ILogin";
import { DataStoreDetector } from "./data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class AuthChangeDetectorService extends DataStoreDetector<ILogin, authActions> {

    setAll(input: ILogin) {
        this.updateDataChanges({ action: authActions.All, payload: input });
    }
    
    setToken(token: string) {
        this.updateDataChanges({ action: authActions.token, payload: { ...this.getClonedDataChange(), token: token } });
    }

}