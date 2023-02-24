export interface DeleteDialogData {
  title?: string;
  message?: string;
  disableClose?: boolean;
  buttonText?: ButtonText;
  width?: string;
  topPosition?: string;
}

export interface ButtonText {
  ok?: string;
  cancel?: string;
}

export interface DialogStyleWidth {
  width?: string;
}
