import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { TextControlComponent } from './components/text-control/text-control.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimePickerComponent } from './components/time-picker/time-picker.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { ToggleComponent } from './components/toggle/toggle.component';
import { MultiChipSelectComponent } from './components/multi-chip-select/multi-chip-select.component';
import { RadioComponent } from './components/radio/radio.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';
import { SelectComponent } from './components/select/select.component';
import { TextControlNumberComponent } from './components/text-control-number/text-control-number.component';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { StrokedButtonComponent } from './components/stroked-button/stroked-button.component';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found/no-data-found.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { TreeViewComponent } from './components/tree-view/tree-view.component';

@NgModule({
  declarations: [
    ButtonComponent,
    TextControlComponent,
    ToggleComponent,
    MultiChipSelectComponent,
    RadioComponent,
    CheckboxComponent,
    SelectComponent,
    TextControlNumberComponent,
    FileUploadComponent,
    TimePickerComponent,
    NoDataFoundComponent,
    TreeViewComponent,
    // directives
    NumbersOnlyDirective,
    DatePickerComponent,
    StrokedButtonComponent,
    CaptchaComponent,
    DeleteConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    NgxMatTimepickerModule,
    SharedMaterialModule,
  ],
  exports: [
    ButtonComponent,
    TextControlComponent,
    ToggleComponent,
    MultiChipSelectComponent,
    RadioComponent,
    CheckboxComponent,
    SelectComponent,
    TextControlNumberComponent,
    FileUploadComponent,
    TimePickerComponent,
    CaptchaComponent,
    NoDataFoundComponent,
    TreeViewComponent,
    // directives
    NumbersOnlyDirective,
    DatePickerComponent,
    StrokedButtonComponent,
  ],
})
export class FormControlModule {}
