import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../../interface/form-control.interface';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss'],
})
export class TextControlComponent {
  @Input() formControlModel: FormControlModel;
  @Input() form: FormGroup;
  @Input() class = '';
  @Input() maxLength: number;
  @Output() inputChange = new EventEmitter<string>();
  @Output() iconClick = new EventEmitter<Event>();

  constructor(public _validator: ValidatorService) {}

  onChange(event: Event) {
    const data = event?.target as HTMLInputElement;
    this.inputChange.emit(data?.value);
  }

  onIconClick(event: Event) {
    this.iconClick.emit(event);
  }
}
