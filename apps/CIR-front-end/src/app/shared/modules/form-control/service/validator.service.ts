import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControlModel } from '../interface/form-control.interface';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  getError(form: FormGroup, field: string, formControlModel: FormControlModel) {
    const formControl = form.get(field);
    if (formControl) {
      if (formControl.touched && formControl.errors) {
        if (formControl.errors['required']) {
          return formControlModel.requiredErrMsg;
        }
        if (formControl.errors['pattern']) {
          return formControlModel.patternErrMsg;
        }
        if (formControl.errors['maxlength']) {
          return formControlModel.maxLengthError;
        }
      }
    }
    return null;
  }
}
