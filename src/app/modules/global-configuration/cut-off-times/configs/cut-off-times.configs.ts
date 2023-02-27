export const cutOffTimeControl = {
  countryField: {
    value: '',
    key: 'countryField',
    label: 'Country',
    inputType: 'text',
  },
  cutOffDayField: {
    value: '',
    key: 'cutOffDayField',
    label: 'CutOffDay',
    inputType: 'text',
  },
  timePickerField: {
    value: '',
    key: 'timePickerField',
    label: 'Cut-Off Time (UTC 00:00+)',
    inputType: 'text',
    required: true,
    setNowButton: true,
    format: 24,
  },
};
export const dayOptions = [
  {
    id: 0,
    key: 'Same',
    value: 'Same Day',
  },
  {
    id: 1,
    key: 'Previous',
    value: 'Previous Day',
  },
];
