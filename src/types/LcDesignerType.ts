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
export interface ActiveProps {
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
export interface ChartConfigsProps {
    [key: string | number]: ChartConfigProps;
}

export interface CanvasSetProps {
    /**
     * 基准高度
     */
    baseHeight?: number;
    /**
     * 列个数
     */
    columns?: number;
    /**
     * 元素间隔
     */
    elemInterval?: number;
    /**
     * 比例
     */
    canvasScale?: [number, number];
}

export enum BgMode {
    /**
     * 无
     */
    NONE,
    /**
     * 颜色
     */
    COLOR,
    /**
     * 图片
     */
    IMG,
}

export enum BgFillType {
    /**
     * 无
     */
    NONE,
    /**
     * X轴
     */
    X,
    /**
     * Y轴
     */
    Y,
}

export enum BgColorMode {
    /**
     * 单色
     */
    SINGLE,
    /**
     * 线性渐变
     */
    LINEAR_GRADIENT,
    /**
     * 径向渐变
     */
    RADIAL_GRADIENT
}

export interface BgConfig {
    /**
     * 背景模式
     */
    bgMode?: BgMode;
    /**
     * 图片尺寸
     */
    imgSize?: [number, number];
    /**
     * 图片源数据
     */
    imgSource?: any;
    /**
     * 填充方式
     */
    bgFillType?: BgFillType;
    /**
     * 颜色模式
     */
    colorMode?: BgColorMode;
    /**
     * 背景色
     */
    color?: string;
}

export interface ProjectConfig {
    /**
     * 大屏名称
     */
    screenName?: string;
    /**
     * 大屏描述
     */
    screenDes?: string;
    /**
     * 大屏状态
     */
    screenState?: string;
    /**
     * 大屏宽度
     */
    screenWidth?: number;
    /**
     * 大屏高度
     */
    screenHeight?: number;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 元素个数
     */
    elemCount: number
}

export interface SystemConfig {
    /**
     * 数据存储方式
     */
    saveType?: string;
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
     * 激活状态属性
     */
    activated: ActiveProps;
    /**
     * 背景设置
     */
    bgConfig: BgConfig | undefined | null;
    /**
     * 画布设置
     */
    canvasConfig: CanvasSetProps,
    /**
     * 系统配置
     */
    systemConfig: SystemConfig,
    /**
     * 项目设置
     */
    projectConfig: ProjectConfig;
    /**
     * 图表配置
     */
    chartConfigs: ChartConfigsProps;
    /**
     * 布局配置
     */
    layoutConfigs: Array<any>;
}