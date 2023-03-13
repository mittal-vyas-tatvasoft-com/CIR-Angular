export const userModel = {
  employeeField: {
    value: '',
    key: 'employeeId',
    label: 'Employee Id',
    requiredErrMsg: 'EmployeeId is Required',
    inputType: 'text',
  },
  salutationField: {
    value: '',
    key: 'salutationLookupItemId',
    label: 'Salutation',
    inputType: 'select',
  },
  firstNameField: {
    value: '',
    key: 'firstName',
    label: 'First Name',
    required: true,
    requiredErrMsg: 'FirstName is Required',
    inputType: 'text',
  },
  lastNameField: {
    value: '',
    key: 'lastName',
    label: 'Last Name',
    requiredErrMsg: 'LastName is Required',
    inputType: 'text',
  },
  emailField: {
    value: '',
    key: 'email',
    label: 'Email',
    requiredErrMsg: 'Email is Required',
    patternErrMsg: 'Please enter the valid email',
    inputType: 'text',
  },
  numberField: {
    value: '',
    key: 'phoneNumber',
    label: 'Tel. No',
    inputType: 'text',
    patternErrMsg: 'Please enter 10 digit number',
  },
  companyNameField: {
    value: '',
    key: 'companyName',
    label: 'Company Name',
    requiredErrMsg: 'Email is Required',
    inputType: 'text',
  },
  userNameField: {
    value: '',
    key: 'userName',
    label: 'User Name',
    requiredErrMsg: 'UserName is Required',
    maxLengthError: 'UserName contains more than 55 character',
    inputType: 'text',
  },

  passwordField: {
    value: '',
    key: 'password',
    label: 'Password',
    requiredErrMsg: 'Password is Required',
    inputType: 'password',
    patternErrMsg:
      'Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  },
  confirmPasswordField: {
    value: '',
    key: 'confirmPassword',
    label: 'Confirm Password',
    requiredErrMsg: 'ConfirmPassword is Required',
    inputType: 'password',
  },
  roleField: {
    value: '',
    key: 'roleId',
    label: 'Role',
    inputType: 'select',
  },
  defaultTimeZoneField: {
    value: '',
    key: 'timeZone',
    label: 'Default Time',
    inputType: 'select',
  },
  defaultLanguageField: {
    value: '',
    key: 'cultureLcid',
    label: 'Default Language',
    inputType: 'select',
  },
  portalThemeField: {
    value: '',
    key: 'portalThemeId',
    label: 'PortalTheme Field',
    inputType: 'select',
  },
  enableField: {
    value: '',
    key: 'enabled',
    label: 'Enabled',
    inputType: 'toggle',
  },
  schedulerActiveField: {
    value: '',
    key: 'schedulerActive',
    label: 'Scheduler Active',
    inputType: 'toggle',
  },
  searchField: {
    value: '',
    key: 'search',
    label: 'Search',
    inputType: 'text',
  },
};
export const staticOptions = {
  enableOptions: [
    {
      id: 0,
      key: '',
      value: 'All',
    },
    {
      id: 1,
      key: true,
      value: 'True',
    },
    {
      id: 2,
      key: false,
      value: 'False',
    },
  ],
};

export const tableColumnConfig = {
  tableColumn: [
    {
      columnDef: 'userName',
      header: 'UserName',
      isSortable: true,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'fullName',
      header: 'Name',
      isSortable: true,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'roleName',
      header: 'Role',
      isSortable: true,
      type: 'String',
      isFilter: true,
      options: [],
    },
    {
      columnDef: 'email',
      header: 'Email',
      isSortable: true,
      type: 'String',
      isFilter: false,
      options: [],
    },
    {
      columnDef: 'createdOn',
      header: 'CreatedOn',
      isSortable: true,
      type: 'String',
    },
    {
      columnDef: 'enabled',
      header: 'Enabled',
      isSortable: true,
      type: 'boolean',
      isFilter: true,
      options: staticOptions.enableOptions,
    },
  ],
};
