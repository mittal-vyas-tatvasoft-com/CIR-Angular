import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  defaultCultureId,
  fieldTypes,
} from 'src/app/shared/common/interfaces/constants.static';
import { emailControl } from '../../config/emails.config';
import { EditorData, Email } from '../../interface/emails.interface';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  @Input() email: Email;
  @Output() changeContent = new EventEmitter();
  @Output() subjectChange = new EventEmitter();
  editorsData: EditorData[] = [];
  form: FormGroup;
  selectedCultureId = defaultCultureId;
  fieldTypes = fieldTypes;
  subjectField = emailControl.subjectField;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      subject: [this.email.subject, [Validators.required]],
    });
  }
}
