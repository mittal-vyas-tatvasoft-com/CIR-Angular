import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Currency } from 'src/app/shared/common/interfaces/currency.interface';
import {
  DialogData,
  DialogStyleWidth,
} from 'src/app/shared/common/interfaces/dialogData.interface';
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
  width: string;
  dialogWidth: DialogStyleWidth;

  constructor(
    private fb: FormBuilder,
    private currenciesService: CurrenciesService,
    public snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<AddCurrencyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    this.createForm();
    if ('data' in this.data) {
      this.width = this.data.data.width ?? '';
      this.dialogWidth = { width: this.width };
    }
  }

  createForm() {
    this.form = this.fb.group({
      symbol: ['', [Validators.required]],
      codeName: ['', [Validators.required]],
    });
  }

  addNewCurrency() {
    if (this.form.valid) {
      this.currenciesService
        .addNewCurrency(this.form.getRawValue())
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<Currency>) => {
            if (res.result) {
              this.snackbarService.success(res.message);
              this.dialogRef.close();
            }
            if (!res.result) {
              this.snackbarService.error(res.message);
            }
          },
          error: (e) => {
            this.snackbarService.error(errors.common.serverError || e.message);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
