import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { validations } from 'src/app/shared/messages/validation.static';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { resetPasswordControl } from '../../configs/reset-password.config';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  resetModel = resetPasswordControl;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
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
      oldPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(validations.common.passwordREGEX),
        ],
      ],
    });
  }

  // api call on reset password click and set the new password
  onReset() {
    const payload = {
      userName: this.form.value.userName,
      oldPassword: this.form.value.oldPassword,
      newPassword: this.form.value.newPassword,
    };
    if (this.form.valid) {
      this.loginService
        .resetPassword(payload)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<string>) => {
            if (res.result) {
              this.snackbarService.success(res.message);
              this.form.reset();
              this.router.navigate(['/']);
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
