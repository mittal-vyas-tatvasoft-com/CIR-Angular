export interface UserModel {
  id: number;
  userName: string;
  password: string;
  email?: string;
  salutationLookupItemId?: number;
  firstName: string;
  lastName: string;
  fullName?: string;
  roleId: number;
  roleName: string;
  enabled: boolean;
  lastLogOn?: Date;
  createdOn: Date;
  lastEditedOn?: Date;
  resetRequired: boolean;
  defaultAdminUser: boolean;
  timeZone: string;
  cultureLcid: number;
  cultureDisplayName: string;
  cultureNativeName: string;
  employeeId?: string;
  phoneNumber?: string;
  scheduledActiveChange?: Date;
  loginAttempts: number;
  companyName?: string;
  portalThemeId?: number;
}

export interface UserViewModel {
  count: number;
  usersList: UserModel[];
}
