export interface Email {
  id: number;
  fieldTypeId: number;
  cultureId: number;
  content: string;
  subject: string;
}
export interface EditorData {
  id: number;
  mailId: number;
  content: string;
  cultureId: number;
}
export interface Language {
  id: number;
  displayName: string;
  enabled: boolean;
  name: string;
  nativeName: string;
  parentId: string;
}
