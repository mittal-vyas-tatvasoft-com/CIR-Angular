import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Currency } from 'src/app/shared/common/interfaces/currency.interface';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { CommonRepositoryService } from 'src/app/shared/services/common/common-repository.service';
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
