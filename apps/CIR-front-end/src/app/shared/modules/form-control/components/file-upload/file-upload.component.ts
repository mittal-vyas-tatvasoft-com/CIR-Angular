import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { errors } from '../../../../../shared/messages/error.static';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';
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
  @Output()
  imageFile: EventEmitter<File | string> = new EventEmitter<File | string>();
  @Input() fileSourceKey: string;
  fileName = '';

  constructor(
    public _validator: ValidatorService,
    public snackbarService: SnackbarService,
  ) {}

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
    this.fileName = '';
    const formControl = this.form.get(this.fileSourceKey);
    if (target.files) {
      const name = target.files[0].name;
      const extensionWithName = name.split('.');
      if (formControl) {
        if (
          this.formControlModel.accept?.includes(`.${extensionWithName[1]}`)
        ) {
          this.imageFile.emit(target.files[0]);
          this.fileName = formControl.value.name;
          return this.fileName;
        } else {
          this.snackbarService.error(errors.fonts.wrongFile);
          this.imageFile.emit('');
        }
      }
    }
    return this.fileName;
  }
}
