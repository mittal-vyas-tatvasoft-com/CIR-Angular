import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Navigation } from 'src/app/shared/common/enum';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { validations } from 'src/app/shared/messages/validation.static';
import { loginControl } from '../../configs/login.config';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  isCaptchaDone = false;
  loginModel = loginControl;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient,
  ) {}

  // apply when page loads
  ngOnInit(): void {
    if (this.loginService.isLoggedIn()) {
      this.router.navigate([`${Navigation.Admin}/${Navigation.User}`]);
    }
    this.createForm();
    this.setValidator();
  }

  createForm() {
    this.form = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.pattern(validations.common.emailREGEX),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(validations.common.passwordREGEX),
        ],
      ],
      recaptchaReactive: [''],
      checkbox: [''],
    });
  }

  // set validators based on conditions
  setValidator() {
    if (localStorage.getItem('isCaptchaDone')) {
      this.isCaptchaDone = true;
      this.form.get('recaptchaReactive')?.clearValidators();
      this.form.get('recaptchaReactive')?.updateValueAndValidity();
    } else {
      this.form.get('recaptchaReactive')?.setValidators(Validators.required);
      this.form.get('recaptchaReactive')?.updateValueAndValidity();
    }
  }

  // api call on login click and if valid then authenticate user
  onLogin() {
    if (this.form.valid) {
      const payload = {
        userName: this.form.value.userName,
        password: this.form.value.password,
      };
      this.loginService
        .login(payload)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<string>) => {
            if (res.result) {
              const token = this.loginService.getToken();
              if (token) {
                localStorage.setItem('isCaptchaDone', 'true');
                this.router.navigate([
                  `${Navigation.Admin}/${Navigation.User}`,
                ]);
              }
            } else {
              console.log(res.message);
            }
          },
          error: (error) => {
            console.log(error);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  // password show and hide
  onIconClick(event: any) {
    if (event.formControlModel.inputType == 'text') {
      event.formControlModel.inputType = 'password';
    } else {
      event.formControlModel.inputType = 'text';
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
