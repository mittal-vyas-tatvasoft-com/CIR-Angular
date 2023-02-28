export const errors = {
  common: {
    required: 'Required',
    serverError: 'Something Went Wrong..Please try again after some time..!',
    noDataFound: 'No Data Found',
  },
  login: {
    loginErrorMessage: 'Email or Password is Invalid',
  },
  forgotPassword: {
    forgotServerMessage: 'There is some issue with server..!',
    forgotErrorMessage: 'UserName or Email is not found',
  },
  resetPassword: {
    resetServerMessage: 'There is some issue with server..!',
    resetErrorMessage: 'Email or old/new password is not found',
  },
  user: {
    notMatchPassword: 'Password and ConfirmPassword not matched..!',
    userNameLength: 'UserName contains more than 55 character',
    emailExists: 'Email is already exists..!',
    userNotFound: 'No Users were Found',
  },
  role: {
    roleNotFound: 'No Role Were Found',
    roleInUse: 'this role is in use...!',
  },
  currency: {
    currencyNotFound: 'No currencies Were Found',
  },
  holidays: {
    holidayNotFound: 'No Holidays were Found',
  },
  fonts: {
    wrongFile: 'The file format is invalid. accepted only .woff,.otf and .ttf',
  },
  weekend: {
    weekendNotFound: 'No Weekends were Found',
  },
};
