import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { DynamicFieldTypes } from 'src/app/shared/common/enum';
import { dynamicFields } from 'src/app/shared/common/interfaces/constants.static';
import { ResponseModel } from 'src/app/shared/common/interfaces/response.interface';
import { CommonFacadeService } from 'src/app/shared/services/common/common-facade.service';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { emailControl } from '../../config/emails.config';
import { Email } from '../../interface/emails.interface';
import { EmailService } from '../../service/email.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './email-list.component.html',
  styleUrls: ['./email-list.component.scss'],
})
export class EmailListComponent implements OnInit {
  private ngUnsubscribe$ = new Subject<void>();
  emailList: Email[];
  isDisabled = true;
  emailContentList: Email[] = [];
  form: FormGroup;
  emailConfig = emailControl;
  dynamicFields = DynamicFieldTypes;
  dynamicData = dynamicFields;
  cultureId: number;
  isDefaultData: boolean;

  constructor(
    private emailService: EmailService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    public commonFacadeService: CommonFacadeService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      languageField: [1],
    });
    this.commonFacadeService.fetchCultureList().subscribe();
    this.cultureId = this.form.get('languageField')?.value;
    this.getEmails(this.cultureId);
  }

  getEmails(cultureId: number) {
    this.emailService.getEmails(cultureId).subscribe({
      next: (res: ResponseModel<Email[]>) => {
        if (res.result) {
          this.emailList = res.data;
          this.emailContentList = res.data;
          if (res.data[0].cultureId == 1) this.isDefaultData = true;
        }
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  contentChange(event: any) {
    console.log(event);
    this.emailContentList[event.fieldTypeId - 1].content = event.content.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subjectChange(event: any) {
    this.emailContentList[event.fieldTypeId - 1].subject = event.content;
  }

  onSubmit() {
    this.emailContentList.map((val) => (val.cultureId = this.cultureId));
    this.emailService
      .saveEmails(this.emailContentList)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: ResponseModel<Email[]>) => {
        if (res.result) {
          this.snackbarService.success(res.message);
        } else {
          this.snackbarService.error(res.message);
        }
      });
  }

  onLanguageSelect(cultureId: number) {
    this.cultureId = cultureId;
    this.getEmails(cultureId);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
