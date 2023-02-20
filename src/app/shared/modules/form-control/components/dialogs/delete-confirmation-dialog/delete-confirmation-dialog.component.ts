import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { message } from 'src/app/shared/messages/messages.static';
import { IDeleteDialogData } from './delete-confirmation-dialog.interface';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent {
  title = '';
  message = '';
  cancelBtnText = '';
  confirmBtnText = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData,
  ) {
    const { dialogs } = message;
    this.title = this.data.title || '';
    this.message = this.data.message || dialogs.areYouSureToDelete;
    this.confirmBtnText = this.data.buttonText?.ok || dialogs.yes;
    this.cancelBtnText = this.data.buttonText?.cancel || dialogs.no;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }
}
