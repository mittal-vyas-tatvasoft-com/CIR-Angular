import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Navigation } from 'src/app/shared/common/enum';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { errors } from 'src/app/shared/messages/error.static';
import { message } from 'src/app/shared/messages/messages.static';
import { validations } from 'src/app/shared/messages/validation.static';
import { userModel } from '../../configs/user.config';
import { UserModel, UserViewModel } from '../../interface/user.interface';
import { UserService } from '../../services/user.service';
import { UserFacadeService } from '../../services/user-facade.service';
import { SelectOption } from 'src/app/shared/modules/form-control/interface/select-option.interface';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { CommonFacadeService } from 'src/app/shared/common/common-facade.service';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss'],
})
export class AddEditUserComponent implements OnInit {
  userId?: number;
  userModel = userModel;
  form: FormGroup;
  roleOptions: SelectOption[];
  salutationOptions: SelectOption[];
  defaultOptions: SelectOption[];
  notMatchedPassword: string;
  lengthError: string;
  private ngUnsubscribe$ = new Subject<void>();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public snackbarService: SnackbarService,
    public commonService: CommonFacadeService,
    public userFacadeService: UserFacadeService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    if (this.userId) {
      this.getUser(this.userId);
    }
    this.form = this.fb.group(
      {
        employeeId: [''],
        salutationLookupItemId: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(validations.common.emailREGEX),
          ],
        ],
        phoneNumber: [
          '',
          [Validators.pattern(validations.common.mobileNumberREGEX)],
        ],
        companyName: ['', Validators.required],
        userName: ['', [Validators.required, Validators.maxLength(55)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(validations.common.passwordREGEX),
          ],
        ],
        confirmPassword: ['', Validators.required],
        roleId: [''],
        timeZone: [1],
        cultureLcid: [''],
        portalThemeId: ['12'],
        enabled: [true],
        schedulerActive: [''],
      },
      { validator: this.checkPasswords },
    );
    this.notMatchedPassword = errors.user.notMatchPassword;
    this.lengthError = errors.user.userNameLength;

    //fill dropdown
    this.getRoleList();
    this.getSalutationList();
    this.commonService.fetchCultureList().subscribe();
  }

  checkPasswords(group: FormGroup) {
    const password = group.controls['password'];
    const confirmPassword = group.controls['confirmPassword'];
    if (password.value === confirmPassword.value) {
      return null;
    } else {
      return { notSame: true };
    }
  }

  getRoleList() {
    this.userFacadeService
      .fetchRoleList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        this.roleOptions = res;
      });
  }

  getSalutationList() {
    this.userFacadeService
      .fetchSalutationList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        this.salutationOptions = res;
      });
  }

  getUser(userId: number) {
    this.userService
      .getUser(userId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<UserModel[]>) => {
          console.log(res);
          if (res.data && res.data.length > 0) {
            const userData = res.data[0];
            this.form.patchValue(res.data);
            this.form.get('confirmPassword')?.setValue(userData.password);
            this.form.get('phoneNumber')?.setValue(userData.phoneNumber);
            this.form.get('roleId')?.setValue(userData.roleId);
            this.form.get('cultureLcid')?.setValue(userData.cultureLcid);
            this.form.get('employeeId')?.setValue(userData.employeeId);
            this.form
              .get('salutationLookupItemId')
              ?.setValue(userData.salutationLookupItemId);
            this.form.get('firstName')?.setValue(userData.firstName);
            this.form.get('lastName')?.setValue(userData.lastName);
            this.form.get('email')?.setValue(userData.email);
            this.form.get('companyName')?.setValue(userData.companyName);
            this.form.get('userName')?.setValue(userData.userName);
            this.form.get('password')?.setValue(userData.password);
            this.form.get('roleId')?.setValue(userData.roleId);
            this.form.get('timeZone')?.setValue(userData.timeZone);
            this.form.get('cultureLcid')?.setValue(userData.cultureLcid);
            this.form.get('portalThemeId')?.setValue(userData.portalThemeId);
            this.form.get('mat-slide-toggle-1')?.setValue(userData.enabled);
            this.form
              .get('mat-slide-toggle-2')
              ?.setValue(userData.scheduledActiveChange);
          }
        },
        error: (e) => {
          this.snackbarService.error(e.message || errors.common.serverError);
        },
      });
  }

  save() {
    const rawData: UserModel = this.form.getRawValue();
    if (this.userId) {
      rawData.id = this.userId;
    }

    //Static Data
    rawData.timeZone = rawData.timeZone && '2023-01-04T18:03:37.118Z';
    rawData.portalThemeId = 12;

    const trimmedValues = Object.entries(rawData).reduce(
      (obj: any, [key, value]) => {
        obj[key] = typeof value === 'string' ? value.trim() : value;
        return obj;
      },
      {},
    );

    if (this.form.valid) {
      this.userService
        .saveUser(trimmedValues)
        .pipe(takeUntil(this.ngUnsubscribe$))
        .subscribe({
          next: (res: ResponseModel<UserViewModel>) => {
            if (res.result) {
              this.router.navigate([`${Navigation.Admin}/${Navigation.User}`]);
              this.snackbarService.success(
                res.message && !this.userId
                  ? message.user.successFullyAdded
                  : message.user.successFullyUpdated,
              );
            }
          },
          error: (e) => {
            this.snackbarService.error(e.message || errors.common.serverError);
          },
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  cancel() {
    this.router.navigate([`${Navigation.Admin}/${Navigation.User}`]);
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
