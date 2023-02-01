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
    // directives
    NumbersOnlyDirective,    
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
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
    // directives
    NumbersOnlyDirective,    
    DatePickerComponent,
  ],
})
export class FormControlModule {}