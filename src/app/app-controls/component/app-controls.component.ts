import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValueLabel } from 'src/app/shared/common/interfaces/label-value.interface';
import { RadioOption } from 'src/app/shared/modules/form-control/interface/radio-option.interface';
import { SelectOption } from 'src/app/shared/modules/form-control/interface/select-option.interface';
import {
  appControls,
  multiChipSelect,
  radioOptions,
  selectOptions,
} from '../configs/app-controls.config';

@Component({
  selector: 'app-app-controls',
  templateUrl: './app-controls.component.html',
  styleUrls: ['./app-controls.component.scss'],
})
export class AppControlsComponent implements OnInit {
  appControls = appControls;
  form: FormGroup;
  selectOptions: SelectOption[] = selectOptions;
  multiChipSelect: ValueLabel[] = multiChipSelect;
  radioOptions: RadioOption[] = radioOptions;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      textField: ['Testing text', [Validators.required]],
      numberField: ['123123', [Validators.required]],
      toggleField: [true],
      selectField: [[], [Validators.required]],
      multiChipSelectField: [[], [Validators.required]],
      radioField: [[], [Validators.required]],
      checkboxField: ['', [Validators.required]],
      fileUploadField: [''],
      timePickerField: [''],
      datePickerField: [''],
    });
  }

  getSelectionControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  onTimeChange(changedTime: string) {}

  submit() {
    if (this.form.invalid) this.form.markAllAsTouched();
  }

  onIconClick(event: any){
     if(event.formControlModel.inputType == 'text'){
      event.formControlModel.inputType = 'password';
     }else{
      event.formControlModel.inputType = 'text';
     }
  }
}
