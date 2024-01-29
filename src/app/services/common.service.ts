import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Settings } from "../core/constants";
import { IConfiguration } from "../interfaces/IConfiguration";
import { isNullOrEmptyString, String } from "../utils/helper";
import { language } from "../enum/enums";



@Injectable({ providedIn: 'root' })

export class CommonService {

  public options = { polling: true };
  public appSettings: IConfiguration = { language: language.En, baseUrl: String.Empty, port: String.Empty, protocol: String.Empty };

  private confUrl: string = 'assets/merossApi.conf.json';

  constructor(private http: HttpClient) {

    const settings = localStorage.getItem(Settings)

    if (!isNullOrEmptyString(settings)) {
      const parsedSettings: IConfiguration = JSON.parse(settings as string);
      this.appSettings = parsedSettings;
    }
  }

  public loadConfigurationFile(): Observable<IConfiguration> {
    return this.http.get<IConfiguration>(this.confUrl);
  }

  public buildUrl(): string {
    const url = this.appSettings.protocol + "://" + this.appSettings.baseUrl + ":" + this.appSettings.port;
    return url;
  }
}
