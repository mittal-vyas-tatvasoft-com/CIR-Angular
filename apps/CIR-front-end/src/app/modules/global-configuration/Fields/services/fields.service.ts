import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { GlobalConfigurationFieldsModel } from '../interfaces/fields.interface';
import { ResponseModel } from '../../../../shared/common/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class FieldsService {
  constructor(private http: HttpClient) {}

  GetAllGlobalConfigurationFields(): Observable<
    ResponseModel<GlobalConfigurationFieldsModel[]>
  > {
    return this.http.get<ResponseModel<GlobalConfigurationFieldsModel[]>>(
      environment.baseURL + 'GlobalConfigurationFields',
    );
  }

  CreateGlobalConfigurationFields(fields: GlobalConfigurationFieldsModel[]) {
    return this.http.post<ResponseModel<GlobalConfigurationFieldsModel[]>>(
      environment.baseURL + 'GlobalConfigurationFields/Create',
      fields,
    );
  }

  UpdateGlobalConfigurationFields(fields: GlobalConfigurationFieldsModel[]) {
    return this.http.put<ResponseModel<GlobalConfigurationFieldsModel[]>>(
      environment.baseURL + 'GlobalConfigurationFields/Update',
      fields,
    );
  }
}
