import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IConf } from "../interfaces/Iconf";
import { ILogin, ILoginRequest } from "../interfaces/ILogin";
import { String } from "../utils/helper";

@Injectable()

export class MerossLoginService {

  private confUrl: string = 'assets/merossApi.conf.json';
  public appSettings: IConf = { baseUrl: String.Empty, port: String.Empty, protocol: String.Empty };

  constructor(private http: HttpClient) { }

  private buildUrl(): string {
    const url =  this.appSettings.protocol + "://" + this.appSettings.baseUrl + ":" + this.appSettings.port;
    return url;
  }

  login(username: string, password: string): Observable<ILogin> {
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const body: ILoginRequest = { user: username, password: password };
    
    const url = this.buildUrl() + "/auth";
    
    return this.http.post<ILogin>(url, body, { headers });
  }

  loadConfigurationFile(): Observable<IConf> {
    return this.http.get<IConf>(this.confUrl);
  }


}
