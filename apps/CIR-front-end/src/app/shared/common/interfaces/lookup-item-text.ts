export interface LookupItemsText {
  id: number;
  lookupItemId: number;
  cultureId: number;
  displayOrder: number;
  text: string;
  active: boolean;
}

export interface UserLookupItemModel {
  lookupItemId: number;
  lookupItemTextId: number;
  lookupItemText: string;
  systemCodeId: number;
  systemCodeName: string;
}
