import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../../interface/form-control.interface';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-text-control-number',
  templateUrl: './text-control-number.component.html',
  styleUrls: ['./text-control-number.component.scss'],
})
export class TextControlNumberComponent {
  @Input() formControlModel: FormControlModel;
  @Input() form: FormGroup;
  constructor(public _validator: ValidatorService) {}
}
