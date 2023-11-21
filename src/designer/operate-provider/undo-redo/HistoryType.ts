/**
 * 操作类型枚举
 */
import {MovableItemType} from "../movable/types";
import {ConfigureObjectFragments} from "../../../utils/ObjectUtil";

export enum HistoryType {
    DRAG,
    RESIZE,
    ADD,
    DEL,
    STYLE,
    HIDE,
    ORDER,
    LOCK,
    GROUP,
    UPD_LAYER_GROUP,
}

/**
 * 记录操作对应的数据类型
 */
type RecordDataType = DragDataType | ResizeDataType | StyleDataType | AddDataType[] |
    DelDataType[] | HideDataType[] | OrderDataType[] | LockDataType[] | MovableItemType[] | MovableItemType;

/**
 * 使用HistoriesRecordType，因为一次操作可能会涉及到多个不同维度的更新。比如：删除图层时，如果存在分组，还需要更新分组的子图层id
 * 此场景同时要删除图层和更新图层。视为两个动作
 */
export interface HistoriesRecordType {
    actions: HistoryRecordType[];
}

/**
 * 历史记录类型
 */
export interface HistoryRecordType {
    type: HistoryType;
    prev: RecordDataType | null;
    next: RecordDataType | null;
}

/**
 * 拖拽数据类型
 */
export interface DragDataType {
    ids: string[];
    x: number;
    y: number;
}

export interface HideDataType {
    id: string;
    hide: boolean;
}

export interface LockDataType {
    id: string;
    lock: boolean;
}

export interface OrderDataType {
    id: string;
    order: number;
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
    data: {
        layoutConfig?: MovableItemType;
        elemConfig?: any;
    };
}

/**
 * 删除数据类型
 */
export interface DelDataType {
    id: string;
    data: {
        layoutConfig: MovableItemType;
        elemConfig?: any;
    };
}

/**
 * 样式数据类型
 */
export interface StyleDataType {
    id: string;
    data: ConfigureObjectFragments;
}