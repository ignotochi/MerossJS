import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Settings } from "../core/constants";
import { IConf } from "../interfaces/IConf";
import { isNullOrEmptyString, String } from "../utils/helper";
import { language } from "../enums/enums";


@Injectable({ providedIn: 'root' })

export class CommonService {

  public options = { polling: true, columns: 4 };
  public appSettings: IConf = { language: language.En, baseUrl: String.Empty, port: String.Empty, protocol: String.Empty };

  private confUrl: string = 'assets/merossApi.conf.json';

  constructor(private http: HttpClient) {

    const settings = localStorage.getItem(Settings)

    if (!isNullOrEmptyString(settings)) {
      const parsedSettings: IConf = JSON.parse(settings as string);
      this.appSettings = parsedSettings;
    }
  }

  public loadConfigurationFile(): Observable<IConf> {
    return this.http.get<IConf>(this.confUrl);
  }

  public buildUrl(): string {
    const url = this.appSettings.protocol + "://" + this.appSettings.baseUrl + ":" + this.appSettings.port;
    return url;
  }
}
