export interface UserDataFilter {
  displayLength: number;
  displayStart: number;
  searchColumnName: string;
  sortColumnName: string;
  isAsc: string;
  roleId: number;
  enabled: boolean | null;
}
