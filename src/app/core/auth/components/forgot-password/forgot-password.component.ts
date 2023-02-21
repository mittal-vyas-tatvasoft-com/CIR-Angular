import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { validations } from 'src/app/shared/messages/validation.static';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { forgotControl } from '../../configs/forgot-password.config';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  forgotModel = forgotControl;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
  ) {}

  // apply when page loads
  ngOnInit(): void {
    this.createForm();
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
    });
  }

  // api call on get password click and send the password to that user
  onForgot() {
    if (this.form.valid) {
      const data = {
        userName: this.form.value.userName,
      };
      this.loginService
        .forgotPassword(data)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<string>) => {
            if (res.result) {
              this.snackbarService.success(res.message);
            } else {
              this.snackbarService.success(res.message);
            }
          },
          error: (error) => {
            this.snackbarService.success(error.message);
          },
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
