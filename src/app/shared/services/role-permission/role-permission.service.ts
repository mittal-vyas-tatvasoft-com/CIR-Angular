import { Injectable } from '@angular/core';
import {
  RoleGrouping2CultureModel,
  RoleGrouping2PermissionModel,
  RoleGrouping2SubSiteModel,
  RolePermissionModel,
  SubRolesModel,
} from 'src/app/modules/users/roles/interfaces/role-permission.interface';
import { IRolePermission } from 'src/app/modules/users/roles/interfaces/role-section.interface';
import {
  GlobalSiteId,
  DefaultCultureId,
} from '../../common/interfaces/constants.static';
import { Column } from '../../modules/tables/interfaces/table-data.interface';

@Injectable({
  providedIn: 'root',
})
export class RolePermissionService {
  userRoleId: string | number;
  hasAllPermissions = false;
  usersPermissions: IRolePermission[] = [];

  constructor() {
    //
  }

  clear() {
    localStorage.removeItem('roles');
    localStorage.removeItem('roleId');
    localStorage.removeItem('hasAll');
  }

  loadRoles() {
    const roles = localStorage.getItem('roles');
    const roleId = localStorage.getItem('roleId');
    const hasAllPermissions = localStorage.getItem('hasAll');

    if (roles) {
      this.usersPermissions = JSON.parse(roles);
    }

    if (roleId) {
      this.userRoleId = Number(roleId);
    }

    if (hasAllPermissions) {
      this.hasAllPermissions = hasAllPermissions === 'true';
    }
  }

  checkPermission(
    privilegesId: number,
    siteId = GlobalSiteId,
    languageId = DefaultCultureId,
  ) {
    if (this.hasAllPermissions === true) {
      return true;
    }

    return this.usersPermissions.some((permission) => {
      if (permission.siteId === siteId) {
        return permission.privileges.includes(privilegesId);
      }
      return false;
    });
  }

  transformRoles(apiResponse: RolePermissionModel) {
    this.hasAllPermissions = apiResponse.allPermissions;
    if (apiResponse.id) {
      this.userRoleId = apiResponse.id;
      localStorage.setItem('roleId', this.userRoleId.toString());
    }
    localStorage.setItem('hasAll', this.hasAllPermissions.toString());
    if (this.hasAllPermissions) {
      return;
    }

    const data: IRolePermission[] = [];

    apiResponse.roles.forEach((element: SubRolesModel) => {
      element.site.forEach((site: RoleGrouping2SubSiteModel) => {
        if (element.groupId) {
          data.push({
            groupId: element.groupId,
            siteId: site.siteId,
            languages: this.getLanguages(site),
            privileges: this.getPrivileges(site.languages[0]),
          });
        }
      });
    });
    localStorage.setItem('roles', JSON.stringify(data));
    this.usersPermissions = data;
  }

  getLanguages(site: RoleGrouping2SubSiteModel) {
    const languages: number[] = [];
    site.languages.forEach((language: RoleGrouping2CultureModel) => {
      languages.push(language.cultureId);
    });
    return languages;
  }

  getPrivileges(languages: RoleGrouping2CultureModel) {
    const privileges: number[] = [];
    languages.privileges.forEach((privilege: RoleGrouping2PermissionModel) => {
      privileges.push(privilege.privilegesId);
    });
    return privileges;
  }

  //assign action column to table according to permissions/rights
  tableColumnsWithPermissions(
    configColumnData: Column[],
    editPermission: number,
    deletePermission: number,
  ): Column[] {
    const tableColumn: Column[] = configColumnData;

    const actionColumn: Column = {
      columnDef: 'more_option',
      header: 'Action',
      isSortable: false,
      isFilter: false,
      type: '',
      actions: [],
    };

    const isEditPermission = this.checkPermission(editPermission);
    const isDeletePermission = this.checkPermission(deletePermission);

    if (!isEditPermission || !isDeletePermission) {
      if (!isEditPermission && !isDeletePermission) {
        actionColumn.actions = ['edit', 'delete'];
      } else {
        if (isEditPermission) {
          actionColumn.actions = ['edit'];
        } else if (isDeletePermission) {
          actionColumn.actions = ['delete'];
        }
      }

      const ind = tableColumn.findIndex((el) => el.columnDef === 'more_option');
      if (!tableColumn[ind]) {
        tableColumn.push(actionColumn);
      }
      return tableColumn;
    }
    return tableColumn;
  }
}
