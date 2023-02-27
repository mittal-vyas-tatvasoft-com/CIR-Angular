import { Injectable } from '@angular/core';
import { CultureModel } from './interfaces/culture.interface';
import { ResponseModel } from './interfaces/response.interface';
import { BehaviorSubject, map } from 'rxjs';
import { SelectOption } from '../modules/interface/select-option.interface';
import { CommonRepositoryService } from './interfaces/common-repository.service';
@Injectable({
  providedIn: 'root',
})
export class CommonFacadeService {
  constructor(private repository: CommonRepositoryService) {}

  private _cultureList = new BehaviorSubject<SelectOption[]>([]);
  public cultureList$ = this._cultureList.asObservable();

  private get cultureList(): SelectOption[] {
    return this._cultureList.getValue();
  }

  private set cultureList(value: SelectOption[]) {
    this._cultureList.next(value);
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
}
