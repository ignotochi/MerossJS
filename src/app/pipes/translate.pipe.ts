import { AfterViewInit, OnDestroy, OnInit, Pipe, PipeTransform } from "@angular/core";
import { I18nService } from "../services/i18n.service";
import { language, languageAction } from "../enums/enums";
import { filter } from "rxjs";

@Pipe({
    name: 'translate'
})

export class TranslatePipe implements PipeTransform, OnInit, AfterViewInit, OnDestroy {

    constructor(private i18n: I18nService) {
    }
    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngOnInit(): void {
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