import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { GlobalConfigurationCutOffTimesModel } from '../interfaces/cut-off-times.interface';

@Injectable({
  providedIn: 'root',
})
export class CutOffTimesService {
  constructor(private http: HttpClient) {}

  getCutOffTimesByCountry(
    countryId: number,
  ): Observable<ResponseModel<GlobalConfigurationCutOffTimesModel>> {
    return this.http.get<ResponseModel<GlobalConfigurationCutOffTimesModel>>(
      environment.baseURL + 'GlobalConfigurationCutOffTimes/' + countryId,
    );
  }

  createCutOffTime(cutOffTimeData: GlobalConfigurationCutOffTimesModel) {
    return this.http.post<ResponseModel<string>>(
      environment.baseURL + 'GlobalConfigurationCutOffTimes/Create',
      cutOffTimeData,
    );
  }

  updateCutOffTime(cutOffTimeData: GlobalConfigurationCutOffTimesModel) {
    return this.http.put<ResponseModel<string>>(
      environment.baseURL + 'GlobalConfigurationCutOffTimes/Update',
      cutOffTimeData,
    );
  }
}
