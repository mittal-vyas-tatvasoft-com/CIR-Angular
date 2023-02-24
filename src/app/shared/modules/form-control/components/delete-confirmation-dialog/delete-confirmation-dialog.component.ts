import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {
  ButtonText,
  DialogData,
  DialogStyleWidth,
} from 'src/app/shared/common/interfaces/dialogdata.interface';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  // vars

  title = '';
  item = '';
  name = '';
  icon = '';
  subTitle = '';
  subHeaderTitle = '';
  buttonText!: ButtonText;
  bottomText!: string;
  width: string;
  dialogStyleWidth: DialogStyleWidth;

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    this.setDialogData(this.data);
  }

  setDialogData(data: DialogData) {
    this.title = data.data.title ?? '';
    if ('data' in data) {
      this.item = data.data.item ?? '';
      this.name = data.data.name ?? '';
      this.icon = data.data.icon ?? '';
      this.subTitle = data.data.subTitle ?? '';
      this.subHeaderTitle = data.data.message ?? '';
      this.buttonText = data.data.buttonText ?? {};
      this.bottomText = data.data.bottomText ?? '';
      this.width = data.data.width ?? '';
      this.dialogStyleWidth = { width: this.width };
    }
  }
}
