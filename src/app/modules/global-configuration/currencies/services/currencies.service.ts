import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency } from 'src/app/shared/common/interfaces/currency.interface';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { GlobalConfigurationCurrencyModel } from '../interfaces/currencies.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private http: HttpClient) {}

  getCurrencyListByCountryId(
    countryId: number,
  ): Observable<ResponseModel<GlobalConfigurationCurrencyModel[]>> {
    return this.http.get<ResponseModel<GlobalConfigurationCurrencyModel[]>>(
      environment.baseURL + 'GlobalConfigurationCurrencies/' + countryId,
    );
  }

  updateCurrencyList(
    currencies: GlobalConfigurationCurrencyModel[],
  ): Observable<ResponseModel<GlobalConfigurationCurrencyModel[]>> {
    return this.http.put<ResponseModel<GlobalConfigurationCurrencyModel[]>>(
      environment.baseURL + 'GlobalConfigurationCurrencies/Update',
      currencies,
    );
  }

  addNewCurrency(currency: Currency): Observable<ResponseModel<Currency>> {
    return this.http.post<ResponseModel<Currency>>(
      environment.baseURL + 'GlobalConfigurationCurrencies/AddNewCurrency',
      currency,
    );
  }
}
