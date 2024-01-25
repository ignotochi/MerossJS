import { AfterViewInit, Injectable, OnDestroy, OnInit } from "@angular/core";
import { CommonService } from "./common.service";
import { HttpClient } from "@angular/common/http";
import it_rsx_json from '../../assets/i18n/resources-it.json';
import en_rsx_json from '../../assets/i18n/resources-en.json';


@Injectable()

export class I18nService implements OnInit, AfterViewInit, OnDestroy {

    public userLangauge;

    public it_rsx: Map<string, string> = new Map();
    public en_rsx: Map<string, string> = new Map();

    constructor(private http: HttpClient, private commonService: CommonService) {

        this.userLangauge = commonService.appSettings.language;
        this.loadResources();
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    ngOnDestroy(): void {
    }

    private loadResources(): void {

        const it_rsx_json_values = Object.values([it_rsx_json]);

        it_rsx_json_values.forEach((el: object) => {

            const entries = Object.entries(el);

            entries.forEach(ent => {

                this.it_rsx.set(ent[0], ent[1])
            });
        });

        const en_rsx_json_values = Object.values([en_rsx_json]);

        en_rsx_json_values.forEach((el: object) => {

            const entries = Object.entries(el);

            entries.forEach(ent => {

                this.en_rsx.set(ent[0], ent[1])
            });
        });
    }
}
