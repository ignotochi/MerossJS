import { Injectable } from "@angular/core";
import { AuthAction, Language, LanguageAction} from "src/app/enum/enums";
import { DataStoreDetector } from "../../services/data-store-detector.service";


@Injectable({
  providedIn: 'root',
})

export class LanguageChangeDetectorService extends DataStoreDetector<Language, LanguageAction> {

    setLanguage(lang: Language) {
        this.update({ action: LanguageAction.Language, payload: lang });
    }
}