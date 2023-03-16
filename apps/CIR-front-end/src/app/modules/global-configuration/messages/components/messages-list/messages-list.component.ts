import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Subject, takeUntil } from 'rxjs';
import {
  defaultCultureId,
  defaultMessagesEditorTitle,
} from '../../../../../shared/common/interfaces/constants.static';
import { CommonRepositoryService } from '../../../../../shared/services/common/common-repository.service';
import { messagesControl } from '../../configs/message.config';
import {
  Culture,
  GlobalMessagesModel,
  GlobalConfigurationMessages,
} from '../../interfaces/message.interface';
import { MessagesService } from '../../services/messages.service';
import { SnackbarService } from '../../../../../shared/snackbar/snackbar.service';
import { ResponseModel } from '../../../../../shared/common/interfaces/response.interface';
import { Permissions } from '../../../../../shared/common/enum';
import { RolePermissionService } from '../../../../../shared/services/role-permission/role-permission.service';
import { SelectOption } from '../../../../../shared/modules/form-control/interface/select-option.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.scss'],
})
export class MessagesListComponent implements OnInit {
  editorsTitle = defaultMessagesEditorTitle;
  languageField = messagesControl.languageField;
  form: FormGroup;
  languages: SelectOption[] = [];
  messages: GlobalMessagesModel[] = [];
  selectedCultureId: number = defaultCultureId;
  editorsData: GlobalConfigurationMessages[] = [];
  private ngUnsubscribe$ = new Subject<void>();
  totalMessages = 0;
  permissions = Permissions;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonRepositoryService,
    private messageService: MessagesService,
    public snackbarService: SnackbarService,
    public rolePermissionService: RolePermissionService,
  ) {}

  ngOnInit(): void {
    this.getAllLanguages();
    this.getMessages();
    this.createForm();
  }

  getMessages(): void {
    this.getAllMessages(this.selectedCultureId);
  }

  getAllMessages(selectedCultureId: number): void {
    this.messageService
      .getMessages(selectedCultureId)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<GlobalMessagesModel[]>) => {
          if (res.result) {
            const result = res as { data: GlobalMessagesModel[] };
            this.messages = result.data;
            //TODO: need to remove another variable for length check later
            this.totalMessages = this.messages?.length;
          }
        },
        error: (e: Error) => {
          this.snackbarService.error(e.message);
        },
      });
  }

  getAllLanguages(): void {
    this.commonService
      .getCultureList()
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res: { data: GlobalMessagesModel[] } | unknown) => {
        const languageList = res as { data: Culture[] };
        languageList.data.forEach((ele) => {
          this.languages.push({
            id: ele.id,
            key: ele.nativeName,
            value: ele.displayName,
          });
          this.form.get('languageField')?.setValue(this.languages[0].id);
        });
      });
  }

  onLanguageSelect(event: MatSelectChange): void {
    this.selectedCultureId = event.value;
    this.getAllMessages(event.value);
  }

  createForm(): void {
    this.form = this.fb.group({
      languageField: [''],
    });
  }

  editorChanged(event: {
    data: string;
    messageId: number;
    type: number;
  }): void {
    if (this.editorsData.length === 0) {
      this.editorsData.push({
        id: event.messageId,
        content: event.data,
        type: event.type,
        cultureId: this.selectedCultureId,
      });
    } else {
      const index = this.editorsData.findIndex(
        (ele) => ele.id === event.messageId,
      );
      if (index >= 0) {
        this.editorsData[index].content = event.data;
      } else {
        this.editorsData.push({
          id: event.messageId,
          content: event.data,
          type: event.type,
          cultureId: this.selectedCultureId,
        });
      }
    }
  }

  onSubmit(): void {
    if (this.editorsData.length === 0) return;
    this.messageService
      .updateMessages(this.editorsData)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe({
        next: (res: ResponseModel<GlobalMessagesModel[]>) => {
          if (res.result) {
            this.editorsData = [];
            this.snackbarService.success(res.message);
          } else {
            this.snackbarService.error(res.message);
          }
        },
        error: (e: Error) => {
          this.snackbarService.error(e.message);
        },
      });
  }

  //hide or show the content
  hideOrShow(i: number) {
    this.editorsTitle[i].hide = !this.editorsTitle[i].hide;
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
