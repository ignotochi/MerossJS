import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Settings } from "../core/constants";
import { IConf } from "../interfaces/IConf";
import { isNullOrEmptyString, String } from "../utils/helper";


@Injectable({ providedIn: 'root' })

export class CommonService {
  private confUrl: string = 'assets/merossApi.conf.json';
  public appSettings: IConf = { baseUrl: String.Empty, port: String.Empty, protocol: String.Empty };
  private settings: IConf = {} as IConf;

  constructor(private http: HttpClient) {
    
    const settings = localStorage.getItem(Settings)
    
    if(!isNullOrEmptyString(settings)) {
      const parsedSettings: IConf = JSON.parse(settings as string);
      this.settings = parsedSettings;
    }
  }

  public loadConfigurationFile(): Observable<IConf> {
    return this.http.get<IConf>(this.confUrl);
  }

  public buildUrl(): string {
    const url = this.settings.protocol + "://" + this.settings.baseUrl + ":" + this.settings.port;
    return url;
  }
}
