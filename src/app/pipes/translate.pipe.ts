import { Pipe, PipeTransform } from "@angular/core";
import { I18nService } from "../services/i18n.service";
import { language } from "../enums/enums";

@Pipe({
    name: 'translate'
})

export class TranslatePipe implements PipeTransform {

    constructor(private i18n: I18nService) { 
    }

    public transform(value: string, args?: any): any {

        let translation: string = "";

        if (this.i18n.userLangauge == language.It) {

            translation = this.i18n.it_rsx.get(value) ?? value;
        }
        else if (this.i18n.userLangauge == language.En) {

            translation = this.i18n.en_rsx.get(value) ?? value;
        }

        return translation;
    }

    public translate(message: string): string {

        const translation = this.transform(message);
        return translation;
      }
}