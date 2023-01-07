/**
 * redux-action类型
 */
import {kebabCase} from "lodash";

export interface Action {
    type: string | number;  //操作
    data: any;     //数据
}


/**
 * 激活组件参数
 */
interface ActiveProps {
    /**
     * 组件id
     */
    id: number;
    /**
     * 组件类型
     */
    type: string;
}

interface BaseInfo {
    id?: string | number;
    name?: string;
    type?: string;
    desc?: string;
}

export interface BaseStyle {
    padding?: string;
    backgroundColor?: string;
    border?: string;
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: string;
    borderWidth?: string;
}


/**
 * 图标属性配置配置
 */
export interface ChartConfigProps {
    baseInfo: BaseInfo;
    baseStyle?: BaseStyle;
    chartProps?: any;
    dataConfig?: {
        dataSourceType: string;//手动、excel、接口、数据库、
        flashFrequency: string | number;
        requestType: string;
    };
}

/**
 * 图表属性列表配置配置
 */
interface ChartConfigsProps {
    [key: string | number]: ChartConfigProps;
}

interface CanvasSetProps {
    /**
     * 数据存储方式 local(本地）server（远程服务）
     */
    saveType: string,
    /**
     * 屏幕比例
     */
    screenRatio: string,
    /**
     * 大屏名称
     */
    screenName: string,
    /**
     * 大屏宽度
     */
    screenWidth: number,
    /**
     * 大屏高度
     */
    screenHeight: number,
    /**
     * 元素间隔距离
     */
    elemInterval: number,
    /**
     * 大屏列划分个数
     */
    columns: number,
    /**
     * 基准高度
     */
    baseLineHeight: number,
    /**
     * 元素个数
     */
    elemCount: number,
}

/**
 * 布局设计器，store类型定义
 */
export interface LCDesignerProps {
    /**
     * 大屏id
     */
    id?: number,
    /**
     * 画布设置
     */
    canvasConfig: CanvasSetProps,
    /**
     * 系统配置
     */
    systemConfig: any,
    /**
     * 激活状态属性
     */
    activated: ActiveProps;
    /**
     * 图表配置
     */
    chartConfigs: ChartConfigsProps;
    /**
     * 布局配置
     */
    layoutConfigs: Array<any>;
    /**
     * 背景设置
     */
    bgConfig: Object;

}