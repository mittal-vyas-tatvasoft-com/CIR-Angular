export const appControls = {
  textField: {
    value: '',
    key: 'textField',
    label: 'Text Control',
    requiredErrMsg: 'Text Control is Required',
    inputType: 'text',
    displayIcon: true,
    iconName: 'visibility'
  },
  numberField: {
    value: '',
    key: 'numberField',
    label: 'Number Control',
    inputType: 'text',
    requiredErrMsg: 'Number Control is Required',
  },
  selectField: {
    value: '',
    key: 'selectField',
    label: 'Select Control',
    inputType: 'select',
    requiredErrMsg: 'Select Control is Required',
  },
  multiChipSelectField: {
    type: 'multi-chip-select',
    value: '',
    key: 'multiChipSelectField',
    label: 'Multi Chip Select Field',
    required: true,
    inputType: '',
  },
  timePickerField: {
    value: '',
    key: 'timePickerField',
    label: 'Time Picker Control',
    inputType: 'text',
    required: true,
    setNowButton: true,
    format: 24,
  },
  toggleField: {
    value: '',
    key: 'toggleField',
    label: 'Toggle Control',
    inputType: 'toggle',
  },
  radioField: {
    value: '',
    key: 'radioField',
    label: 'Radio Control',
    inputType: 'radio',
  },
  checkboxField: {
    value: '',
    key: 'checkboxField',
    label: 'Checkbox Control',
    inputType: 'checkbox',
    requiredErrMsg: 'Checkbox Control is Required',
  },
  fileUploadField: {
    value: '',
    key: 'fileUploadField',
    label: 'File Upload Control',
    inputType: 'file',
    requiredErrMsg: 'File Upload Control is Required',
  },
  datePickerField: {
    value: '',
    key: 'datePickerField',
    label: 'Date Picker Control',
    inputType: 'text',
  },
};

export const selectOptions = [
  {
    id: 1,
    key: 'Select1',
    value: 'Select Option 1',
  },
  {
    id: 2,
    key: 'Select2',
    value: 'Select Option 2',
  },
  {
    id: 3,
    key: 'Select3',
    value: 'Select Option 3',
  },
];

export const multiChipSelect = [
  {
    label: 'Test 1',
    value: 1,
  },
  {
    label: 'Test 2',
    value: 2,
  },
  {
    label: 'Test 3',
    value: 3,
  },
];

export const radioOptions = [
  {
    key: 'Radio 1',
    value: 'Select Option 1',
  },
  {
    key: 'Radio 2',
    value: 'Select Option 2',
  },
  {
    key: 'Radio 3',
    value: 'Select Option 3',
  },
];
