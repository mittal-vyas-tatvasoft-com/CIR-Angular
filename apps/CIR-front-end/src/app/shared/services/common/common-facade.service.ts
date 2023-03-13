import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CountryCode } from '../../common/interfaces/country.interface';
import { CultureModel } from '../../common/interfaces/culture.interface';
import { Currency } from '../../common/interfaces/currency.interface';
import { ResponseModel } from '../../common/interfaces/response.interface';
import { SelectOption } from '../../modules/form-control/interface/select-option.interface';
import { CommonRepositoryService } from './common-repository.service';

@Injectable({
  providedIn: 'root',
})
export class CommonFacadeService {
  private _countryList = new BehaviorSubject<SelectOption[]>([]);
  public countryList$ = this._countryList.asObservable();

  private _cultureList = new BehaviorSubject<SelectOption[]>([]);
  public cultureList$ = this._cultureList.asObservable();

  private _countryCodeList = new BehaviorSubject<SelectOption[]>([]);
  public countryCodeList$ = this._countryCodeList.asObservable();

  private _currencyList = new BehaviorSubject<SelectOption[]>([]);
  public currencyList$ = this._currencyList.asObservable();

  constructor(private repository: CommonRepositoryService) {}

  private get countryList(): SelectOption[] {
    return this._countryList.getValue();
  }

  private set countryList(value: SelectOption[]) {
    this._countryList.next(value);
  }

  private get cultureList(): SelectOption[] {
    return this._cultureList.getValue();
  }

  private set cultureList(value: SelectOption[]) {
    this._cultureList.next(value);
  }

  private get countryCodeList(): SelectOption[] {
    return this._countryCodeList.getValue();
  }

  private set countryCodeList(value: SelectOption[]) {
    this._countryCodeList.next(value);
  }

  private get currencyList(): SelectOption[] {
    return this._currencyList.getValue();
  }

  private set currencyList(value: SelectOption[]) {
    this._currencyList.next(value);
  }

  fetchCountryList() {
    return this.repository.getCountryList().pipe(
      map((data: ResponseModel<CountryCode[]>) => {
        this.countryList = data.data.map((file: CountryCode) => ({
          id: file.id,
          key: file.code,
          value: file.countryName,
        }));

        this.countryCodeList = data.data.map((file: CountryCode) => ({
          id: file.id,
          key: file.countryName,
          value: file.code,
        }));
      }),
    );
  }

  fetchCultureList() {
    return this.repository.getCultureList().pipe(
      map(
        (data: ResponseModel<CultureModel[]>) =>
          (this.cultureList = data.data.map((file: CultureModel) => ({
            id: file.id,
            key: file.nativeName,
            value: file.displayName,
          }))),
      ),
    );
  }

  fetchCurrencyList(): Observable<SelectOption[]> {
    return this.repository.getCurrencyList().pipe(
      map(
        (data: ResponseModel<Currency[]>) =>
          (this.currencyList = data.data.map((file: Currency) => ({
            id: file.id,
            key: file.codeName,
            value: file.codeName,
          }))),
      ),
    );
  }
}
