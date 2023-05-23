import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { IConf } from "../interfaces/IConf";

@Injectable({ providedIn: 'root' })

export class CommonService {
  private confUrl: string = 'assets/merossApi.conf.json';
  public settings: IConf = {} as IConf;

  constructor(private http: HttpClient) {
  }

  public async loadConfigurationFile(): Promise<void> {
    await lastValueFrom(this.http.get<IConf>(this.confUrl)).then(value => this.settings = value);
  }

  public buildUrl(): string {
    let url = "";

    if (this.settings.port) {
      url = this.settings.protocol + "://" + this.settings.baseUrl + ":" + this.settings.port;
    } 
    else {
      url = this.settings.protocol + "://" + this.settings.baseUrl;
    }

    return url;
  }
}
