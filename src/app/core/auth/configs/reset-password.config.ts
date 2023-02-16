export const resetPasswordControl = {
  userNameField: {
    value: '',
    key: 'userName',
    label: 'User Name',
    required: true,
    requiredErrMsg: 'User Name is Required',
    patternErrMsg: 'User Name is not valid',
    inputType: 'text',
  },
  oldPasswordField: {
    value: '',
    key: 'oldPassword',
    label: 'Old Password',
    required: true,
    requiredErrMsg: 'Old Password is Required',
    patternErrMsg: 'Please enter a valid old password',
    inputType: 'text',
  },
  newPasswordField: {
    value: '',
    key: 'newPassword',
    label: 'New Password',
    required: true,
    requiredErrMsg: 'New Password is Required',
    patternErrMsg: 'Please enter a valid new password',
    inputType: 'text',
  },
};
