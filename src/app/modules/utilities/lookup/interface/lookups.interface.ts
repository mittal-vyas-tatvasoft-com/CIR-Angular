export interface Lookup {
  cultureId: number;
  cultureDisplayText: string;
  systemCodeId: number;
  code: string;
}
export interface LookupModel {
  culturalCodesList: Lookup[];
}
export interface Language {
  id: number;
  displayName: string;
  enabled: boolean;
  name: string;
  nativeName: string;
  parentId: string;
}
export interface LookupItem {
  id: number;
  systemCodeId: number;
  lookupItemId: number;
  cultureId: number;
  displayOrderId: number;
  text: string;
  active: true;
  code: string;
}
