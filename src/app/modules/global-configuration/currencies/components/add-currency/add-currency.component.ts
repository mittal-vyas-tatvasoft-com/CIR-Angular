import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Currency } from 'src/app/shared/common/interfaces/currency.interface';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { errors } from 'src/app/shared/messages/error.static';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { addNewCurrencyControl } from '../../configs/currencies.config';
import { CurrenciesService } from '../../services/currencies.service';

@Component({
  selector: 'app-add-currency',
  templateUrl: './add-currency.component.html',
  styleUrls: ['./add-currency.component.scss'],
})
export class AddCurrencyComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  form: FormGroup;
  addNewCurrencyFormControl = addNewCurrencyControl;

  constructor(
    private fb: FormBuilder,
    private currenciesService: CurrenciesService,
    public snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      symbol: [''],
      codeName: [''],
    });
  }

  addNewCurrency() {
    this.currenciesService
      .addNewCurrency(this.form.getRawValue())
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<Currency>) => {
          this.snackbarService.success(res.message);
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
