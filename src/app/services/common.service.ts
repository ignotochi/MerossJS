import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Settings } from "../core/constants";
import { IConfiguration } from "../interfaces/IConfiguration";
import { isNullOrEmptyString, String } from "../utils/helper";
import packajeJson from './../../../package.json';
import { Language } from "../enum/enums";
import confUrl from '../../assets/merossApi.conf.json';

@Injectable({ providedIn: 'root' })

export class CommonService {

  private angularPackajeJson: Map<string, string> = new Map();

  public options = { polling: true };
  public appSettings: IConfiguration = { language: Language.En, marossApiUrl: String.Empty, port: String.Empty, protocol: String.Empty, version: String.Empty };

  private conf: Map<string, string> = new Map();

  constructor(private http: HttpClient) {

    const settings = localStorage.getItem(Settings)

    if (!isNullOrEmptyString(settings)) {
      const parsedSettings: IConfiguration = JSON.parse(settings as string);
      this.appSettings = parsedSettings;
    }

    const packajeJson_target_keys: string[] = ["version"];

    Object.values([packajeJson]).forEach((el: object) => {

      const entries = Object.entries(el);

      entries.filter(item => packajeJson_target_keys.includes(item[0])).forEach(ent => {
        this.angularPackajeJson.set(ent[0], ent[1])
      });
    });

    this.appSettings.version = this.angularPackajeJson.get("version") ?? "0.0.0";

    this.loadConfigurationFile();
  }

  public saveSettings(): void {
    if (this.appSettings) {
      localStorage.setItem(Settings, JSON.stringify(this.appSettings));
    }
  }

  private loadConfigurationFile(): void {

    const conf_values = Object.values([confUrl]);

    conf_values.forEach((el: object) => {

        const entries = Object.entries(el);

        entries.forEach(ent => {

            this.conf.set(ent[0], ent[1])
        });
    });

    this.appSettings = { 

      language: this.conf.get('language') as Language ?? Language.En,
      marossApiUrl: this.conf.get('marossApiUrl') ?? '',
      port: this.conf.get('port') ?? '',
      protocol: this.conf.get('protocol') ?? '',
      version: this.conf.get('version') ?? ''
    };
  }

  public buildUrl(): string {

    let url = this.appSettings.protocol + "://" + this.appSettings.marossApiUrl;

    if (!isNullOrEmptyString(this.appSettings.port)) {
      url += ":" + this.appSettings.port;
    }

    return url;
  }
}
