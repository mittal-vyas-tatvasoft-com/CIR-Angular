export interface DialogData {
  width?: string;
  title?: string;
  message: string;
  type?: string;
  disableClose?: boolean;
  buttonText?: ButtonText;
  data?: any;
  showConfirmButton?: boolean;
  customConfirmButtonStyle?: boolean;
  hasBackdrop?: boolean;
  panelClass?: string;
  backdropClass?: string;
  maxWidth?: string;
  showDialogIcon?: boolean;
  bottomText?: string;
}

export interface ButtonText {
  ok?: string;
  cancel?: string;
}
