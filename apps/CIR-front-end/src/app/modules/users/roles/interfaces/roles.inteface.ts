export interface Roles {
  id: number;
  name: string;
  description: string;
  wrongLoginAttempts: number;
  allPermissions: boolean;
  createdOn: Date;
  lastEditedOn?: Date;
}

export interface RolesModel {
  rolesList: Roles[];
  count: number;
}
