import { AfterViewInit, Injectable, OnDestroy, OnInit } from "@angular/core";
import { CommonService } from "./common.service";
import it_rsx_json from '../../assets/i18n/resources-it.json';
import en_rsx_json from '../../assets/i18n/resources-en.json';
import de_rsx_json from '../../assets/i18n/resources-de.json';
import es_rsx_json from '../../assets/i18n/resources-es.json';
import fr_rsx_json from '../../assets/i18n/resources-fr.json';
import ru_rsx_json from '../../assets/i18n/resources-ru.json';
import cn_rsx_json from '../../assets/i18n/resources-cn.json';


@Injectable()

export class I18nService implements OnInit, AfterViewInit, OnDestroy {

    public userLangauge;

    public it_rsx: Map<string, string> = new Map();
    public en_rsx: Map<string, string> = new Map();
    public de_rsx: Map<string, string> = new Map();
    public es_rsx: Map<string, string> = new Map();
    public fr_rsx: Map<string, string> = new Map();
    public ru_rsx: Map<string, string> = new Map();
    public cn_rsx: Map<string, string> = new Map();

    constructor(private commonService: CommonService) {

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

        const de_rsx_json_values = Object.values([de_rsx_json]);

        de_rsx_json_values.forEach((el: object) => {

            const entries = Object.entries(el);

            entries.forEach(ent => {

                this.de_rsx.set(ent[0], ent[1])
            });
        });

        const es_rsx_json_values = Object.values([es_rsx_json]);

        es_rsx_json_values.forEach((el: object) => {

            const entries = Object.entries(el);

            entries.forEach(ent => {

                this.es_rsx.set(ent[0], ent[1])
            });
        });

        const fr_rsx_json_values = Object.values([fr_rsx_json]);

        fr_rsx_json_values.forEach((el: object) => {

            const entries = Object.entries(el);

            entries.forEach(ent => {

                this.fr_rsx.set(ent[0], ent[1])
            });
        });

        const ru_rsx_json_values = Object.values([ru_rsx_json]);

        ru_rsx_json_values.forEach((el: object) => {

            const entries = Object.entries(el);

            entries.forEach(ent => {

                this.ru_rsx.set(ent[0], ent[1])
            });
        });

        const cn_rsx_json_values = Object.values([cn_rsx_json]);

        cn_rsx_json_values.forEach((el: object) => {

            const entries = Object.entries(el);

            entries.forEach(ent => {

                this.cn_rsx.set(ent[0], ent[1])
            });
        });
    }
}
