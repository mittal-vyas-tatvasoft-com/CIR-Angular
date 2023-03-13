import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { UserModel, UserViewModel } from '../interface/user.interface';
import { UserDataFilter } from '../interface/user-filter.interface';
import { ResponseModel } from '../../../../shared/common/interfaces/response.interface';
import { UserLookupItemModel } from '../../../../shared/common/interfaces/lookup-item-text';
import { Roles } from '../../roles/interfaces/roles.inteface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  url: string;

  getUsers(userData: UserDataFilter): Observable<ResponseModel<UserViewModel>> {
    this.setFilterUrl(userData);
    return this.http.get<ResponseModel<UserViewModel>>(
      environment.baseURL + this.url,
    );
  }

  getUser(id: number): Observable<ResponseModel<UserModel[]>> {
    return this.http.get<ResponseModel<UserModel[]>>(
      environment.baseURL + `Users/${id}`,
    );
  }

  saveUser(data: UserModel): Observable<ResponseModel<UserViewModel>> {
    if (data.id) {
      return this.http.put<ResponseModel<UserViewModel>>(
        environment.baseURL + `Users/Update`,
        data,
      );
    } else {
      return this.http.post<ResponseModel<UserViewModel>>(
        environment.baseURL + `Users/Create`,
        data,
      );
    }
  }

  deleteUser(id: number): Observable<ResponseModel<UserViewModel>> {
    return this.http.delete<ResponseModel<UserViewModel>>(
      environment.baseURL + `Users/Delete?id=${id}`,
    );
  }

  getRoleList(): Observable<ResponseModel<Roles[]>> {
    return this.http.get<ResponseModel<Roles[]>>(
      environment.baseURL + `Roles/GetAllRoles`,
    );
  }

  getSalutationList(): Observable<ResponseModel<UserLookupItemModel[]>> {
    return this.http.get<ResponseModel<UserLookupItemModel[]>>(
      environment.baseURL + `Common/GetSalutationTypeList?code=Salutation-type`,
    );
  }

  setFilterUrl(userData: UserDataFilter) {
    this.url = `Users/GetAllUsersDetailBySP?displayLength=${userData.displayLength}&displayStart=${userData.displayStart}`;
    if (userData.sortColumnName)
      this.url = this.url + `&sortCol=${userData.sortColumnName}`;
    if (userData.searchColumnName)
      this.url = this.url + `&search=${userData.searchColumnName}`;
    if (userData.roleId) this.url = this.url + `&roleId=${userData.roleId}`;
    if (userData.enabled != null)
      this.url = this.url + `&enabled=${userData.enabled}`;
    if (userData.isAsc) this.url = this.url + `&sortDir=${userData.isAsc}`;
  }
}
