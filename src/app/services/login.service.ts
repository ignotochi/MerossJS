import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "../core/constants";
import { ILogin, ILoginRequest } from "../interfaces/ILogin";
import { CommonService } from "./common.service";

@Injectable()

export class MerossLoginService {

  constructor(private http: HttpClient, private commonService: CommonService) { 
  }

  validateLocalToken(token: string): Observable<ILogin> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: Token,
        token: token
      })
    };
    
    const url = this.commonService.buildUrl() + "/check";
    
    return this.http.post<ILogin>(url, null, httpOptions);
  }

  login(username: string, password: string): Observable<ILogin> {

    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    const body: ILoginRequest = { user: username, password: password };
    const url = this.commonService.buildUrl() + "/auth";
    
    return this.http.post<ILogin>(url, body, { headers });
  }

  logout(token: string): Observable<{logout: boolean}> {

    const url = this.commonService.buildUrl() + "/logout";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: Token,
        token: token
      }),
    };

    return this.http.get<{logout: boolean}>(url, httpOptions);
  }
}
