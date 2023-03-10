import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Currency } from '../../../../shared/common/interfaces/currency.interface';
import { ResponseModel } from '../../../../shared/common/interfaces/response.interface';
import { CommonRepositoryService } from '../../../../shared/services/common/common-repository.service';
import { CurrencyModel } from '../interfaces/currencies.interface';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesFacadeService {
  constructor(private commonRepositoryService: CommonRepositoryService) {}

  fetchAllCurrencies(): Observable<CurrencyModel[]> {
    return this.commonRepositoryService.getCurrencyList().pipe(
      map((data: ResponseModel<Currency[]>) =>
        data.data.map((item) => ({
          countryId: 0,
          currencyId: item.id,
          enabled: false,
          codeName: item.codeName,
        })),
      ),
    );
  }
}
