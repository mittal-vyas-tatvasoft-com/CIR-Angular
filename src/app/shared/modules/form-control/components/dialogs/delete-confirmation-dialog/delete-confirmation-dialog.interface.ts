export interface IDeleteDialogData {
  title?: string;
  message?: string;
  disableClose?: boolean;
  buttonText?: IButtonText;
  width?: string;
  topPosition?: string;
}

interface IButtonText {
  ok?: string;
  cancel?: string;
}
