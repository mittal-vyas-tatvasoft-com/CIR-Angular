import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountryCode } from '../../common/interfaces/country.interface';
import { CultureModel } from '../../common/interfaces/culture.interface';
import { Currency } from '../../common/interfaces/currency.interface';
import { ResponseModel } from '../../common/interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class CommonRepositoryService {
  constructor(private http: HttpClient) {}

  getCountryList(): Observable<ResponseModel<CountryCode[]>> {
    return this.http.get<ResponseModel<CountryCode[]>>(
      `${environment.baseURL}Common/GetCountries`,
    );
  }

  getCultureList(): Observable<ResponseModel<CultureModel[]>> {
    return this.http.get<ResponseModel<CultureModel[]>>(
      `${environment.baseURL}Common/GetCultures`,
    );
  }

  getCurrencyList(): Observable<ResponseModel<Currency[]>> {
    return this.http.get<ResponseModel<Currency[]>>(
      `${environment.baseURL}Common/GetCurrencies`,
    );
  }
}
