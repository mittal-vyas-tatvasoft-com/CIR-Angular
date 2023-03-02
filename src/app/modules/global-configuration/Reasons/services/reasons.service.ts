import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { GlobalConfigurationReasons } from '../interfaces/reasons.interface';

@Injectable({
  providedIn: 'root',
})
export class ReasonsService {
  constructor(private http: HttpClient) {}

  getAllGlobalConfigurationReasons(): Observable<
    ResponseModel<GlobalConfigurationReasons[]>
  > {
    return this.http.get<ResponseModel<GlobalConfigurationReasons[]>>(
      environment.baseURL + 'GlobalConfigurationReasons',
    );
  }

  updateGlobalConfigurationReasons(
    dropdownOptions: GlobalConfigurationReasons[],
  ) {
    return this.http.put<ResponseModel<string>>(
      environment.baseURL + 'GlobalConfigurationReasons/Update',
      dropdownOptions,
    );
  }

  AddDGlobalConfigurationReasons(
    dropdownOptions: GlobalConfigurationReasons[],
  ) {
    return this.http.post<ResponseModel<string>>(
      environment.baseURL + 'GlobalConfigurationReasons/Create',
      dropdownOptions,
    );
  }
}
