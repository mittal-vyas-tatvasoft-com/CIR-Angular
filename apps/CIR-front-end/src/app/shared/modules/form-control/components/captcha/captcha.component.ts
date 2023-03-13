import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';

@Component({
  selector: 'app-captcha',
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
})
export class CaptchaComponent {
  SITE_KEY = environment.SITE_KEY;

  @Input() captchaForm: FormGroup;
  @Output() onResolveClick = new EventEmitter<string>();

  resolved(captchaResponse: string) {
    this.onResolveClick.emit(captchaResponse);
  }
}
