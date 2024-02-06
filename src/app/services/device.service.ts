import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "../core/constants";
import { IDevice } from "../interfaces/IDevice";
import { IDeviceFilter } from "../interfaces/IDeviceFilter";
import { IToggleDevicesFilter } from "../interfaces/IToggleDevices";
import { Auth } from "./auth.service";
import { CommonService } from "./common.service";

@Injectable()

export class DeviceService {
  constructor(private http: HttpClient, private commonService: CommonService, private auth: Auth) {
  }

  loadMerossDevices(filters: IDeviceFilter): Observable<IDevice[]> {
    const url = this.commonService.buildUrl() + "/loaddevices";

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: Token,
        token: this.auth.getLocalToken()
      }),
      params: new HttpParams({
        fromString: `DevicesFilter= ${JSON.stringify(filters.models)}`
      }),
    };

    return this.http.get<IDevice[]>(url, httpOptions);
  }

  toggleDevice(filters: IToggleDevicesFilter[]): Observable<IDevice[]> {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: Token,
        token: this.auth.getLocalToken()
      })
    };

    const url = this.commonService.buildUrl() + "/toggledevice";
    const body: IToggleDevicesFilter[] = filters;
    return this.http.post<IDevice[]>(url, body, httpOptions);
  }
}
