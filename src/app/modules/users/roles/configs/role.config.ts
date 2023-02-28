export const roleControl = {
  roleField: {
    value: '',
    key: 'roleField',
    label: 'Role Name',
    inputType: 'text',
    required: true,
    requiredErrorMsg: 'Role Name is required.',
  },
  descriptionField: {
    value: '',
    key: 'descriptionField',
    label: 'Role Description',
    inputType: 'text',
    required: true,
    requiredErrorMsg: 'Role Description is required.',
  },
  wrongLoginAttemptsField: {
    value: '',
    key: 'wrongLoginAttemptsField',
    label: 'WrongLoginAttempts',
    inputType: 'text',
    required: true,
    requiredErrorMsg: 'Role WrongLoginAttempts is required.',
  },
  permissionField: {
    value: false,
    key: 'permissionField',
    label: 'Role has all permissions',
    inputType: 'boolean',
    required: false,
  },
  sitesField: {
    value: '',
    key: 'sitesField',
    label: 'Site/section',
    inputType: '',
    type: 'multi-chip-select',
    required: true,
  },
  languagesField: {
    value: '',
    key: 'languagesField',
    label: 'Language',
    inputType: '',
    type: 'multi-chip-select',
    required: true,
  },
  privilegesField: {
    value: '',
    key: 'privilegesField',
    label: 'Privileges',
    inputType: '',
    type: 'multi-chip-select',
    required: true,
  },
  searchField: {
    value: '',
    key: 'search',
    label: 'Search',
    inputType: 'text',
  },
};

export const tableColumnConfig = {
  tableColumn: [
    {
      columnDef: 'name',
      header: 'Name',
      isSortable: true,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'description',
      header: 'Description',
      isSortable: true,
      type: 'String',
      isFilter: false,
      options: [],
    },
  ],
};
