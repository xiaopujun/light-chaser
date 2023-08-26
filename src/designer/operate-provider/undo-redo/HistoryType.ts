export enum HistoryType {
    SELECT,
    DRAG,
    RESIZE,
    ADD,
    DEL,
    STYLE,
}

export interface HistoryRecordType {
    type: HistoryType;
    data: DragDataType | ResizeDataType | AddDataType[] | DelDataType[] | StyleDataType[];
}

export interface SelectDataType {
    ids: string[];
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface DragDataType {
    ids: string[];
    x: number;
    y: number;
}

export interface ResizeDataType {
    ids: string[];
    width: number;
    height: number;
    direction: [number, number];
}


export interface AddDataType {
    id: string;
    data: any;
}

export interface DelDataType {
    id: string;
    data: any;
}

export interface StyleDataType {
    id: string;
    style: any;
}