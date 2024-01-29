import { Injectable } from "@angular/core";
import { authAction, language, languageAction} from "src/app/enum/enums";
import { DataStoreDetector } from "./data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class LanguageChangeDetectorService extends DataStoreDetector<language, languageAction> {

    
    setLanguage(lang: language) {
        this.updateDataChanges({ action: languageAction.Language, payload: lang });
    }

}