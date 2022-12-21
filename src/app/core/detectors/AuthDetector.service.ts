import { Injectable } from "@angular/core";
import { authActions} from "src/app/enums/enums";
import { ILogin } from "src/app/interfaces/ILogin";
import { DataStoreDetector } from "./change-detector.service";


@Injectable()
export class ChangeDetectorAuth extends DataStoreDetector<ILogin, authActions> {

    setAll(input: ILogin) {
        this.updateDataChanges({ action: authActions.All, payload: input });
    }
    
    setToken(token: string) {
        this.updateDataChanges({ action: authActions.token, payload: { ...this.getClonedDataChange(), token: token } });
    }

}