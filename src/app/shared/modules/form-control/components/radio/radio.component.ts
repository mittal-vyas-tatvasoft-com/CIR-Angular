import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../../interface/form-control.interface';
import { RadioOption } from '../../interface/radio-option.interface';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
})
export class RadioComponent {
  @Input() formControlModel: FormControlModel;
  @Input() form: FormGroup;
  @Input() options: RadioOption[] = [];
  constructor(public _validator: ValidatorService) {}

  getOptions() {
    const formControlModel = this.options;
    if (formControlModel) {
      return formControlModel;
    }

    return [];
  }
}
