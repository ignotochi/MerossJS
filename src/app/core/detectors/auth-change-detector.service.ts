import { Injectable } from "@angular/core";
import { AuthAction} from "src/app/enum/enums";
import { ILogin } from "src/app/interfaces/ILogin";
import { DataStoreDetector } from "../../services/data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class AuthChangeDetectorService extends DataStoreDetector<ILogin, AuthAction> {

    setAll(input: ILogin) {
        this.update({ action: AuthAction.All, payload: input });
    }
    
    setToken(token: string) {
        this.update({ action: AuthAction.token, payload: { ...this.clone(), token: token } });
    }
}