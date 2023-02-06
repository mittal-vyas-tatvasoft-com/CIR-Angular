import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  appControls,
  selectOptions,
} from 'src/app/app-controls/configs/app-controls.config';
import { SelectOption } from 'src/app/shared/modules/form-control/interface/select-option.interface';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
})
export class MainHeaderComponent implements OnInit {
  @Input() isHandset: boolean | null;
  @Output() onMenuIconClick = new EventEmitter();
  appControls = appControls;
  form: FormGroup;
  selectOptions: SelectOption[] = selectOptions;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      selectField: [[], [Validators.required]],
    });
  }

  getSelectionControl(key: string): FormControl {
    return this.form.get(key) as FormControl;
  }

  onTimeChange(changedTime: string) { }

  submit() {
    if (this.form.invalid) this.form.markAllAsTouched();
  }

  onIconClick(event: any) {
    if (event.formControlModel.inputType == 'text') {
      event.formControlModel.inputType = 'password';
    } else {
      event.formControlModel.inputType = 'text';
    }
  }

  onClick() {
    this.onMenuIconClick.emit();
  }
}
