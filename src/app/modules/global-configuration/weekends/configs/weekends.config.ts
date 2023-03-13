export const weekendsControl = {
  countryField: {
    value: '',
    key: 'countryField',
    label: 'All Country Names',
    inputType: 'select',
    requiredErrMsg: 'Country is required.',
  },
  dayField: {
    value: '',
    key: 'dayField',
    label: 'Day of Week',
    inputType: 'select',
    required: true,
    requiredErrMsg: 'Day of Week is required.',
  },
  searchField: {
    value: '',
    key: 'search',
    label: 'Search',
    inputType: 'text',
  },
  countryCodeField: {
    value: '',
    key: 'countryCodeField',
    label: 'All Country Code',
    inputType: 'select',
  },
  addCountryField: {
    value: '',
    key: 'addCountryField',
    label: 'Name',
    inputType: 'select',
    required: true,
    requiredErrMsg: 'Country Name is required.',
  },
};

export const dayOptions = [
  {
    id: 0,
    key: 'Sunday',
    value: 'Sunday',
  },
  {
    id: 1,
    key: 'Monday',
    value: 'Monday',
  },
  {
    id: 2,
    key: 'Tuesday',
    value: 'Tuesday',
  },
  {
    id: 3,
    key: 'Wednesday',
    value: 'Wednesday',
  },
  {
    id: 4,
    key: 'Thursday',
    value: 'Thursday',
  },
  {
    id: 5,
    key: 'Friday',
    value: 'Friday',
  },
  {
    id: 6,
    key: 'Saturday',
    value: 'Saturday',
  },
];

export const tableColumnConfig = {
  tableColumn: [
    {
      columnDef: 'countryName',
      header: 'CountryName',
      isSortable: true,
      type: 'String',
      isFilter: true,
      options: [],
    },
    {
      columnDef: 'countryCode',
      header: 'CountryCode',
      isSortable: true,
      type: 'String',
      isFilter: true,
      options: [],
    },
    {
      columnDef: 'dayOfWeek',
      header: 'DayOfWeek',
      isSortable: true,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'more_option',
      header: 'Action',
      isSortable: false,
      type: '',
      actions: ['delete'],
    },
  ],
};
