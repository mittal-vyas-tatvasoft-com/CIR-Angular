import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TimePickerModel } from '../../interface/time-picker.interface';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
})
export class TimePickerComponent {
  selectedTime: any;
  formControlItem: FormControl = new FormControl('');
  @Output() timeChanged = new EventEmitter<string>();
  @Input() form: FormGroup;
  @Input() timePickerModel: TimePickerModel;

  @ViewChild('timepicker') timepicker: any;

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }

  changeTime() {
    this.timeChanged.emit(this.formControlItem.value);
  }

  setNow() {
    const now = new Date();
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const str = hours + ':' + minutes;
    this.formControlItem.setValue(str);
  }
}
