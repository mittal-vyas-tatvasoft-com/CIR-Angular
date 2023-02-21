import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../../interface/form-control.interface';
import { ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Input() formControlModel: FormControlModel;
  @Input() form: FormGroup;
  @Input() fileType: string[];
  @Output()
  imageFile: EventEmitter<File | null> = new EventEmitter<File | null>();

  constructor(public _validator: ValidatorService) {}

  getType() {
    const formControlModel = this.formControlModel as FormControlModel;
    if (formControlModel.inputType) {
      return formControlModel.inputType;
    }
    return '';
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    //sending the file to dynamic-form component.
    this.imageFile.emit(target.files ? target?.files[0] : null);
  }
}
