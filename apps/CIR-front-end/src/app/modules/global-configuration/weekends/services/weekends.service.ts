import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WeekendDataFilter } from '../interfaces/weekend.filter.interface';
import { ResponseModel } from '../../../../shared/common/interfaces/response.interface';
import {
  GlobalConfigurationWeekendModel,
  GlobalConfigurationWeekends,
} from '../interfaces/weekends.interface';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeekendsService {
  constructor(private http: HttpClient) {}
  filterUrl: string;

  getWeekends(
    weekendData: WeekendDataFilter,
  ): Observable<ResponseModel<GlobalConfigurationWeekendModel>> {
    this.setFilterUrl(weekendData);
    return this.http.get<ResponseModel<GlobalConfigurationWeekendModel>>(
      environment.baseURL + this.filterUrl,
    );
  }

  saveWeekend(
    weekend: GlobalConfigurationWeekends,
  ): Observable<ResponseModel<GlobalConfigurationWeekends>> {
    return this.http.post<ResponseModel<GlobalConfigurationWeekends>>(
      environment.baseURL + 'GlobalConfigurationWeekend/Create',
      weekend,
    );
  }

  deleteWeekend(
    id: number,
  ): Observable<ResponseModel<GlobalConfigurationWeekendModel>> {
    return this.http.delete<ResponseModel<GlobalConfigurationWeekendModel>>(
      environment.baseURL + `GlobalConfigurationWeekend/Delete?id=${id}`,
    );
  }

  setFilterUrl(weekendData: WeekendDataFilter) {
    this.filterUrl = `GlobalConfigurationWeekend?displayLength=${weekendData.displayLength}&displayStart=${weekendData.displayStart}`;
    if (weekendData.sortColumnName)
      this.filterUrl =
        this.filterUrl + `&sortCol=${weekendData.sortColumnName}`;
    if (weekendData.search)
      this.filterUrl = this.filterUrl + `&search=${weekendData.search}`;
    if (weekendData.countryCodeId)
      this.filterUrl =
        this.filterUrl + `&countryCodeId=${weekendData.countryCodeId}`;
    if (weekendData.countryNameId)
      this.filterUrl =
        this.filterUrl + `&countryNameId=${weekendData.countryNameId}`;
    this.filterUrl = this.filterUrl + `&sortAscending=${weekendData.isAsc}`;
  }
}
