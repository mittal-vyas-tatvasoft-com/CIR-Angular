export interface Culture {
    id: number;
    displayName: string;
    enabled: boolean;
    name: string;
    nativeName: string;
    parentId: string;
}
export interface GlobalMessagesModel {
    id: number;
    type: number;
    content: string;
    cultureId: number;
    cultureName: string;
}

export interface GlobalConfigurationMessages {
    id: number;
    type: number;
    content: string;
    cultureId: number;
}