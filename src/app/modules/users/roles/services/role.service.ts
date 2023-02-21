import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { RolePermissionModel } from '../interfaces/role-permission.interface';
import { OptionsList, SortObj } from '../interfaces/role-section.interface';
import { RolesModel } from '../interfaces/roles.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpClient) {}

  list(
    limit: number,
    page: number,
    sortObj: SortObj,
    search: string,
  ): Observable<ResponseModel<RolesModel>> {
    let params = `displayLength=${limit}&sortCol=${
      sortObj.active
    }&sortAscending=${
      sortObj.direction === 'asc' || sortObj.direction === ''
    }&search=${search}`;
    if (page !== 0) {
      params += `&displayStart=${(page - 1) * limit}`;
    }
    return this.http.get<ResponseModel<RolesModel>>(
      `${environment.baseURL}Roles?${params}`,
    );
  }

  post(
    model: RolePermissionModel,
  ): Observable<ResponseModel<RolePermissionModel>> {
    return this.http.post<ResponseModel<RolePermissionModel>>(
      `${environment.baseURL}Roles/Create`,
      model,
    );
  }

  put(
    model: RolePermissionModel,
  ): Observable<ResponseModel<RolePermissionModel>> {
    return this.http.put<ResponseModel<RolePermissionModel>>(
      `${environment.baseURL}Roles/Update`,
      model,
    );
  }

  delete(id: number): Observable<ResponseModel<RolesModel>> {
    return this.http.delete<ResponseModel<RolesModel>>(
      `${environment.baseURL}Roles/Delete?roleId=${id}`,
    );
  }

  get(id: number): Observable<ResponseModel<RolePermissionModel>> {
    return this.http.get<ResponseModel<RolePermissionModel>>(
      `${environment.baseURL}Roles/${id}`,
    );
  }

  removeSection(id: number | string) {
    return this.http.delete(`${environment.baseURL}Roles/RemoveSection/${id}`);
  }

  allEnableLanguages(): Observable<ResponseModel<OptionsList[]>> {
    return this.http.get<ResponseModel<OptionsList[]>>(
      `${environment.baseURL}Roles/GetLanguagesListByRole`,
    );
  }
  allSites(): Observable<ResponseModel<OptionsList[]>> {
    return this.http.get<ResponseModel<OptionsList[]>>(
      `${environment.baseURL}Roles/GetSubSiteList`,
    );
  }

  allPrivileges(): Observable<ResponseModel<OptionsList[]>> {
    return this.http.get<ResponseModel<OptionsList[]>>(
      `${environment.baseURL}Roles/GetRolePrivilegesList`,
    );
  }
}
