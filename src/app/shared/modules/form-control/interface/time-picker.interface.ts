export interface TimePickerModel {
  value: string | boolean;
  key: string;
  label: string;
  inputType: string;
  required: boolean;
  setNowButton: boolean;
  format: number;
}
