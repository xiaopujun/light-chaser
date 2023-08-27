/**
 * 操作类型枚举
 */
export enum HistoryType {
    DRAG,
    RESIZE,
    ADD,
    DEL,
    STYLE,
}

/**
 * 记录操作对应的数据类型
 */
type RecordDataType = DragDataType | ResizeDataType | AddDataType[] | DelDataType[] | StyleDataType[];

/**
 * 历史记录类型
 */
export interface HistoryRecordType {
    type: HistoryType;
    prev: RecordDataType;
    next: RecordDataType;

    //废弃
    data?: RecordDataType;
}

/**
 * 拖拽数据类型
 */
export interface DragDataType {
    ids: string[];
    x: number;
    y: number;
}

/**
 * 缩放数据类型
 */
export interface ResizeDataType {
    ids: string[];
    width: number;
    height: number;
    direction: [number, number];
}

/**
 * 添加数据类型
 */
export interface AddDataType {
    id: string;
    data: any;
}

/**
 * 删除数据类型
 */
export interface DelDataType {
    id: string;
    data: any;
}

/**
 * 样式数据类型
 */
export interface StyleDataType {
    id: string;
    style: any;
}