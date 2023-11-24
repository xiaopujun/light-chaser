/**
 * 操作类型枚举
 */
import {ConfigureObjectFragments} from "../../../utils/ObjectUtil";
import {ILayerItem} from "../../DesignerType";

export enum OperateType {
    /**
     * 拖拽
     */
    DRAG,
    /**
     * 缩放
     */
    RESIZE,
    /**
     * 添加组件
     */
    ADD,
    /**
     * 删除组件
     */
    DEL,
    /**
     * 更新组件样式
     */
    UPD_STYLE,
    /**
     * 隐藏组件
     */
    HIDE,
    /**
     * 组件排序
     */
    ORDER,
    /**
     * 组件锁定
     */
    LOCK,
    /**
     * 组件编组
     */
    GROUP,
    /**
     * 更新图层数据
     */
    UPD_LAYER_GROUP,
}

/**
 * 记录操作对应的数据类型
 */
type RecordDataType = IDragOperateData | IResizeOperateData | IUpdStyleOperateData | IAddOperateData[] |
    IDelOperateData[] | IHideOperateData[] | IOrderOperateData[] | ILockOperateData[] | ILayerItem[] | ILayerItem;

/**
 * 使用HistoriesRecordType，因为一次操作可能会涉及到多个不同维度的更新。比如：删除图层时，如果存在分组，还需要更新分组的子图层id
 * 此场景同时要删除图层和更新图层。视为两个动作
 */
export interface IHistoriesRecord {
    actions: IHistoryRecord[];
}

/**
 * 历史记录类型
 */
export interface IHistoryRecord {
    type: OperateType;
    prev: RecordDataType | null;
    next: RecordDataType | null;
}

/**
 * 拖拽数据类型
 */
export interface IDragOperateData {
    ids: string[];
    x: number;
    y: number;
}

export interface IHideOperateData {
    id: string;
    hide: boolean;
}

export interface ILockOperateData {
    id: string;
    lock: boolean;
}

export interface IOrderOperateData {
    id: string;
    order: number;
}


/**
 * 缩放数据类型
 */
export interface IResizeOperateData {
    ids: string[];
    width: number;
    height: number;
    direction: [number, number];
}

/**
 * 添加数据类型
 */
export interface IAddOperateData {
    id: string;
    data: {
        layerConfig?: ILayerItem;
        elemConfig?: any;
    };
}

/**
 * 删除数据类型
 */
export interface IDelOperateData {
    id: string;
    data: {
        layerConfig: ILayerItem;
        elemConfig?: any;
    };
}

/**
 * 样式数据类型
 */
export interface IUpdStyleOperateData {
    id: string;
    data: ConfigureObjectFragments;
}