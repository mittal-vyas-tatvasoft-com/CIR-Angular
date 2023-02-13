export interface Field {
  label: string;
  value: number;
}

export interface RoleSection {
  sId?: string;
  id?: number;
  sites: Field[];
  languages: Field[];
  privileges: Field[];
}

export interface TreeWithId {
  id: number | string;
  data: TreeNode[];
}

export interface OptionsList {
  id: number;
  displayName?: string;
  name?: string;
  code?: string;
  nativeName?: string;
}

export interface SortObj {
  active: string;
  direction: string;
}

export interface TreeNode {
  id?: number;
  name: string;
  children?: TreeNode[];
}

export interface IRolePermission {
  groupId: number;
  siteId: number;
  languages: number[];
  privileges: number[];
}
