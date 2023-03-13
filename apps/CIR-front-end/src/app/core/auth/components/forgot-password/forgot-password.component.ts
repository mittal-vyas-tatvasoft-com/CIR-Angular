import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ResponseModel } from '../../../../shared/common/interfaces/response.interface';
import { validations } from '../../../../shared/messages/validation.static';
import { SnackbarService } from '../../../../shared/snackbar/snackbar.service';
import { forgotControl } from '../../configs/forgot-password.config';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  forgotModel = forgotControl;
  disable = false;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
    private router: Router,
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

      this.disable = true;

      this.loginService
        .forgotPassword(data)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<string>) => {
            if (res.result) {
              this.snackbarService.success(res.message);
              this.router.navigate(['/reset-password']);
            } else {
              this.snackbarService.error(res.message);
              this.disable = false;
            }
          },
          error: (error) => {
            this.snackbarService.error(error.message);
            this.disable = false;
          },
        });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
