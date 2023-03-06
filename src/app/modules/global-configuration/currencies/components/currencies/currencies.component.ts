import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { defaultCountryId } from 'src/app/shared/common/interfaces/constants.static';
import { CountryCode } from 'src/app/shared/common/interfaces/country.interface';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { CommonFacadeService } from 'src/app/shared/services/common/common-facade.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { currenciesControl } from '../../configs/currencies.config';
import {
  CurrencyModel,
  GlobalConfigurationCurrencyModel,
} from '../../interfaces/currencies.interface';
import { CurrenciesFacadeService } from '../../services/currencies-facade.service';
import { CurrenciesService } from '../../services/currencies.service';
import { errors } from 'src/app/shared/messages/error.static';
import { DialogService } from 'src/app/shared/services/dialog/dialog.service';
import { AddCurrencyComponent } from '../add-currency/add-currency.component';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.scss'],
})
export class CurrenciesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  displayedColumns: string[] = ['currency', 'enabled'];
  dataSource = new MatTableDataSource<GlobalConfigurationCurrencyModel>();
  countries: CountryCode[] = [];
  selectedCountry: number = defaultCountryId;
  currencies: CurrencyModel[] = [];
  changedCurrencies: GlobalConfigurationCurrencyModel[] = [];
  form: FormGroup;
  countryField = currenciesControl.countryField;
  tableColumn = [
    {
      columnDef: 'codeName',
      header: 'Currency',
      isSortable: false,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'enabled',
      header: 'Enabled',
      isSortable: false,
      type: 'toggle',
      isFilter: false,
      options: [],
    },
  ];

  constructor(
    private fb: FormBuilder,
    private currenciesService: CurrenciesService,
    private currenciesFacadeService: CurrenciesFacadeService,
    private dialogService: DialogService,
    public commonFacadeService: CommonFacadeService,
    public snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.getCurrencies();
    this.commonFacadeService.fetchCountryList().subscribe();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({});
    this.form.addControl('country', new FormControl(this.selectedCountry));
  }

  // fetches all currencies
  getCurrencies(): void {
    this.currenciesFacadeService
      .fetchAllCurrencies()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: CurrencyModel[]) => {
          this.currencies = res;
          this.getCurrencyByCountryId(this.selectedCountry);
        },
        error: (e: Error) => {
          this.snackbarService.error(errors.common.serverError || e.message);
        },
      });
  }

  //updates currencies list on changing/selecting a country
  getCurrencyByCountryId(selectedCountry: number): void {
    this.currenciesService
      .getCurrencyListByCountryId(selectedCountry)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<GlobalConfigurationCurrencyModel[]>) => {
          this.resetCurrencies();

          if (res.result) {
            res.data.forEach((ele: GlobalConfigurationCurrencyModel) => {
              this.currencies.map((data, i) => {
                if (data.currencyId === ele.currencyId) {
                  this.currencies[i].countryId = this.selectedCountry;

                  if (ele.enabled) {
                    this.currencies[i].enabled = true;
                  } else {
                    this.currencies[i].enabled = false;
                  }
                }
              });
            });
          }
        },
        error: (e: Error) => {
          this.snackbarService.error(errors.common.serverError || e.message);
        },
      });
  }

  // resets all currencies values to default before changing country's currency list
  resetCurrencies(): void {
    this.currencies.map((data) => {
      data.countryId = 0;
      if (data.enabled) {
        data.enabled = false;
      }
    });

    this.changedCurrencies = [];
  }

  // sets country id
  onSelectCountry(event: Event | number): void {
    this.selectedCountry = event as number;
    this.getCurrencyByCountryId(this.selectedCountry);
  }

  //on toggle change, pushes changed currencies into a list to use it as input on api
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectionChanges(e: any): void {
    this.currencies.map((data, i) => {
      if (data.currencyId == e.element.currencyId) {
        this.currencies[i].enabled = e.data.checked;
        this.currencies[i].countryId = this.selectedCountry;

        const existingCurrencyIndex = this.changedCurrencies.findIndex(
          (x) =>
            x.currencyId === e.element.currencyId &&
            x.countryId === e.element.countryId,
        );

        if (existingCurrencyIndex === -1) {
          this.changedCurrencies.push({
            countryId: this.currencies[i].countryId,
            currencyId: this.currencies[i].currencyId,
            enabled: this.currencies[i].enabled,
          });
        } else {
          this.changedCurrencies[existingCurrencyIndex].enabled =
            e.element.enabled;
        }
      }
    });
  }

  // submits/saves currencies data
  onSubmit(): void {
    if (this.changedCurrencies.length > 0) {
      this.currenciesService
        .updateCurrencyList(this.changedCurrencies)
        .subscribe({
          next: (res: ResponseModel<GlobalConfigurationCurrencyModel[]>) => {
            if (res.result) {
              this.snackbarService.success(res.message);
            } else {
              this.snackbarService.error(res.message);
            }
            this.getCurrencyByCountryId(this.selectedCountry);
          },
          error: (e: Error) => {
            this.snackbarService.error(errors.common.serverError || e.message);
            this.getCurrencyByCountryId(this.selectedCountry);
          },
        });
    }
  }

  //open dialog to add new currency
  addNewCurrency() {
    const dialogRef = this.dialogService.openModel(AddCurrencyComponent, {
      data: {
        width: '600px',
        maxWidth: '600px',
        showDialogIcon: true,
      },
      message: '',
    });
    dialogRef?.afterClosed().subscribe({
      next: () => {
        this.getCurrencies();
      },
      error: (e) => {
        this.snackbarService.error(errors.common.serverError || e.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
