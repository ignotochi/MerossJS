import { Injectable } from "@angular/core";
import { AuthAction} from "src/app/enum/enums";
import { ILogin } from "src/app/interfaces/ILogin";
import { DataStoreDetector } from "../../services/data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class AuthChangeDetectorService extends DataStoreDetector<ILogin, AuthAction> {

    setAll(input: ILogin) {
        this.updateDataChanges({ action: AuthAction.All, payload: input });
    }
    
    setToken(token: string) {
        this.updateDataChanges({ action: AuthAction.token, payload: { ...this.getClonedDataChange(), token: token } });
    }
}