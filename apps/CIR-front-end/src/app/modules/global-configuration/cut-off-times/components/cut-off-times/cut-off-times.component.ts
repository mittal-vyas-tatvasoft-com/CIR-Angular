import { Component, OnInit, ViewChild } from '@angular/core';
import { CutOffTimesService } from '../../services/cut-off-times.service';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';
import { GlobalConfigurationCutOffTimesModel } from '../../interfaces/cut-off-times.interface';
import { ResponseModel } from '../../../../../shared/common/interfaces/response.interface';
import { Subject, takeUntil } from 'rxjs';
import { defaultCountryId } from '../../../../../shared/common/interfaces/constants.static';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  cutOffTimeControl,
  dayOptions,
} from '../../configs/cut-off-times.configs';
import { SelectOption } from '../../../../../shared/modules/form-control/interface/select-option.interface';
import { TimePickerComponent } from '../../../../../shared/modules/form-control/components/time-picker/time-picker.component';
import { CommonFacadeService } from '../../../../../shared/services/common/common-facade.service';
@Component({
  selector: 'app-cut-off-times',
  templateUrl: './cut-off-times.component.html',
  styleUrls: ['./cut-off-times.component.scss'],
})
export class CutOffTimesComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  @ViewChild(TimePickerComponent, { static: true })
  timePicker: TimePickerComponent;
  form: FormGroup;
  cutOffDayOptions: SelectOption[] = dayOptions;
  cutOffTimeData: GlobalConfigurationCutOffTimesModel;
  cutOffDayField = cutOffTimeControl.cutOffDayField;
  countryField = cutOffTimeControl.countryField;
  timePickerField = cutOffTimeControl.timePickerField;
  countryId = defaultCountryId;

  constructor(
    private fb: FormBuilder,
    private cutOffTimesService: CutOffTimesService,
    private snackbarService: SnackbarService,
    public commonService: CommonFacadeService,
  ) {}

  ngOnInit(): void {
    this.commonService
      .fetchCountryList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe();
    this.getCutOffTimesByCountryId(this.countryId);
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      cutOffDayField: [''],
      countryField: [''],
      timePickerField: [''],
    });
  }

  getCutOffTimesByCountryId(countryId: number) {
    this.cutOffTimesService
      .getCutOffTimesByCountry(countryId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<GlobalConfigurationCutOffTimesModel>) => {
          if (res.result) {
            this.cutOffTimeData =
              res.data as GlobalConfigurationCutOffTimesModel;
            this.cutOffTimeData.cutOffTime =
              this.cutOffTimeData.cutOffTime.substring(0, 5);
            this.setForm();
          } else {
            this.snackbarService.error(res.message);
          }
        },
        error: (e) => {
          this.snackbarService.error(e.message);
        },
      });
  }

  setForm() {
    this.form.get('cutOffDayField')?.setValue(this.cutOffTimeData.cutOffDay);
    this.form.get('countryField')?.setValue(this.cutOffTimeData.countryId);
    this.timePicker.formControlItem.setValue(this.cutOffTimeData.cutOffTime);
  }

  onCountrySelect(event: Event | number) {
    this.countryId = event as number;
    this.getCutOffTimesByCountryId(this.countryId);
  }

  onCutOffDaySelection(cutOffDay: number) {
    if (this.cutOffTimeData.cutOffDay != cutOffDay) {
      this.cutOffTimeData.cutOffDay = cutOffDay;
    }
  }

  onTimeChange(changedTime: string) {
    if (this.cutOffTimeData.cutOffTime != changedTime) {
      this.cutOffTimeData.cutOffTime = changedTime;
    }
  }

  onSave() {
    this.cutOffTimeData.id =
      this.cutOffTimeData.id == null || undefined ? 0 : this.cutOffTimeData.id;
    if (this.cutOffTimeData.id == 0) {
      this.cutOffTimesService
        .createCutOffTime(this.cutOffTimeData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<string>) => {
            if (res.result) {
              this.snackbarService.success(res.message);
            } else {
              this.snackbarService.error(res.message);
            }
          },
        });
    } else {
      this.cutOffTimesService
        .updateCutOffTime(this.cutOffTimeData)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<string>) => {
            if (res.result) {
              this.snackbarService.success(res.message);
            } else {
              this.snackbarService.error(res.message);
            }
          },
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
