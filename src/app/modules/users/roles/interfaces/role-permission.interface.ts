export interface RolePermissionModel {
  id?: number | string;
  name: string;
  description: string;
  wrongLoginAttempts: number;
  allPermissions: boolean;
  roles: SubRolesModel[];
}

export interface SubRolesModel {
  groupId?: number;
  site: RoleGrouping2SubSiteModel[];
}

export interface RoleGrouping2SubSiteModel {
  siteId: number;
  languages: RoleGrouping2CultureModel[];
}

export interface RoleGrouping2CultureModel {
  cultureId: number;
  privileges: RoleGrouping2PermissionModel[];
}

export interface RoleGrouping2PermissionModel {
  privilegesId: number;
}
