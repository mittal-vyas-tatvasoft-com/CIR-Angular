export const resetPasswordControl = {
  userNameField: {
    value: '',
    key: 'userName',
    label: 'User Name',
    required: true,
    requiredErrMsg: 'User name is required',
    patternErrMsg: 'User name is not valid',
    inputType: 'text',
    displayIcon: true,
    iconName: 'person',
  },
  oldPasswordField: {
    value: '',
    key: 'oldPassword',
    label: 'Old Password',
    required: true,
    requiredErrMsg: 'Old Password is required',
    patternErrMsg:
      'Password length should be 8 characters and it should contain one uppercase, lowercase, special character, and digit.',
    inputType: 'password',
    displayIcon: true,
    iconName: 'visibility',
  },
  newPasswordField: {
    value: '',
    key: 'newPassword',
    label: 'New Password',
    required: true,
    requiredErrMsg: 'New Password is required',
    patternErrMsg:
      'Password length should be 8 characters and it should contain one uppercase, lowercase, special character, and digit.',
    inputType: 'password',
    displayIcon: true,
    iconName: 'visibility',
  },
};
