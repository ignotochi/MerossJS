import { Pipe } from "@angular/core";
import { I18nService } from "../services/i18n.service";
import { Language } from "../enum/enums";

@Pipe({
    name: 'translate'
})

export class TranslatePipe  {

    constructor(private readonly i18n: I18nService) {
    }

    public transform(value: string, args?: any): any {

        let translation: string = "";

        if (this.i18n.userLangauge == Language.It) {

            translation = this.i18n.it_rsx.get(value) ?? value;
        }
        else if (this.i18n.userLangauge == Language.En) {

            translation = this.i18n.en_rsx.get(value) ?? value;
        }
        else if (this.i18n.userLangauge == Language.De) {

            translation = this.i18n.de_rsx.get(value) ?? value;
        }
        else if (this.i18n.userLangauge == Language.Es) {

            translation = this.i18n.es_rsx.get(value) ?? value;
        }
        else if (this.i18n.userLangauge == Language.Fr) {

            translation = this.i18n.fr_rsx.get(value) ?? value;
        }
        else if (this.i18n.userLangauge == Language.Ru) {

            translation = this.i18n.ru_rsx.get(value) ?? value;
        }
        else if (this.i18n.userLangauge == Language.Cn) {

            translation = this.i18n.cn_rsx.get(value) ?? value;
        }

        return translation;
    }

    public translate(message: string): string {

        const translation = this.transform(message);
        return translation;
    }
}