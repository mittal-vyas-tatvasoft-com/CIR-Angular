export interface FormControlModel {
  value: string | boolean;
  key: string;
  label: string;
  requiredErrMsg?: string;
  patternErrMsg?: string;
  maxLengthError?: string;
  inputType: string;
  displayIcon?: boolean;
  iconName?: string;
  accept?: string[];
}
