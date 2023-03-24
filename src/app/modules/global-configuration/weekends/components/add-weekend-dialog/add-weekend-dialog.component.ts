import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import {
  DialogData,
  DialogStyleWidth,
} from 'src/app/shared/common/interfaces/dialogData.interface';
import { weekendsControl } from '../../configs/weekends.config';
import { dayOptions } from '../../configs/weekends.config';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { WeekendsService } from '../../services/weekends.service';
import { CommonFacadeService } from 'src/app/shared/services/common/common-facade.service';
import { GlobalConfigurationWeekends } from '../../interfaces/weekends.interface';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { errors } from 'src/app/shared/messages/error.static';

@Component({
  selector: 'app-add-weekend-dialog',
  templateUrl: './add-weekend-dialog.component.html',
  styleUrls: ['./add-weekend-dialog.component.scss'],
})
export class AddWeekendDialogComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject<void>();
  form: FormGroup;
  dialogWidth: DialogStyleWidth;
  countryField = weekendsControl.countryField;
  dayOptions = dayOptions;
  dayField = weekendsControl.dayField;
  width: string;

  constructor(
    private fb: FormBuilder,
    private weekendService: WeekendsService,
    public commonService: CommonFacadeService,
    public snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<AddWeekendDialogComponent>,
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
      dayField: ['', [Validators.required]],
      countryField: ['', [Validators.required]],
    });
  }

  saveWeekend() {
    if (this.form.valid) {
      const weekendData: GlobalConfigurationWeekends = {
        id: 0,
        countryId: this.form.value.countryField,
        dayOfWeekId: this.form.value.dayField,
      };
      this.weekendService
        .saveWeekend(weekendData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<GlobalConfigurationWeekends>) => {
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

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
