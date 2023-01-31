import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../../interface/form-control.interface';
import { SelectOption } from '../../interface/select-option.interface';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() formControlModel: FormControlModel;
  @Input() form: FormGroup;
  @Input() options: SelectOption[] | null = [];
  @Output() selection = new EventEmitter();
  constructor(public _validator: ValidatorService) {}

  getOptions() {
    const formControlModel = this.options;
    if (formControlModel) {
      return formControlModel;
    }

    return [];
  }
}
