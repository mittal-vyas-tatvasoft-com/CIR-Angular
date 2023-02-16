export enum Navigation {
  //Common Navigation
  Admin = 'admin',
  Add = 'add',
  Edit = 'edit',

  //Auth Navigation
  Login = 'login',
  ForgotPassword = 'forgot-password',
  ResetPassword = 'reset-password',

  //User Navigation
  User = 'users',

  //Role Navigation
  Role = 'roles',

  //Website Navigation
  Portal = 'portal',
  clients = 'clients',
  EditPortal = 'edit',

  //Global Configuration Navigation
  GlobalConfiguration = 'global-configuration',
  Currencies = 'currencies',
  CutOffTimes = 'cut-off-times',
  Font = 'fonts',
  Style = 'styles',
  Messages = 'messages',
  DropdownOption = 'dropdown-options',
  Email = 'emails',
  Holidays = 'holidays',
  Weekends = 'weekends',

  //Utilities Navigation
  Utilities = 'utilities',
  Lookups = 'lookups',
  Languages = 'languages',
}

export enum Type {
  Refund = 1,
  Return,
  ProductType,
}

export enum StyleType {
  Textbox = 0,
  Colorpicker = 1,
}

export enum Permissions {
  USER_LIST = 1,
  USER_CREATE = 2,
  USER_EDIT = 3,
  USER_DELETE = 4,

  ROLES_LIST = 5,
  ROLES_CREATE = 6,
  ROLES_EDIT = 7,
  ROLES_DELETE = 8,

  MESSAGES_LIST = 9,
  MESSAGES_CREATE = 10,
  MESSAGES_EDIT = 11,
  MESSAGES_DELETE = 12,
}

export enum Website {
  Client = 0,
  Portal = 1,
}

export enum DynamicFieldTypes {
  SERVICE_FIELDS = 1,
  BOOKING_FIELDS = 2,
}
