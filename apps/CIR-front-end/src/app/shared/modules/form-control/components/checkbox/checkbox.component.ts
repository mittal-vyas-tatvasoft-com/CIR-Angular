import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../../interface/form-control.interface';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit {
  @Input() formControlModel: FormControlModel;
  @Input() form: FormGroup;

  constructor(public _validator: ValidatorService) {}
  ngOnInit(): void {
    console.log(this.formControlModel);
    console.log(this.form);
  }
}
