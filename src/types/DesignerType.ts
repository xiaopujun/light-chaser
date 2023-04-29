import {Layout} from "react-grid-layout";

/**
 * 主题
 */
export interface Theme {
    //主体色
    main?: string;
    //文字色
    text?: string;
    //背景色
    background?: string;
    //辅助色
    auxiliary?: string;
    //强调色
    emphasize?: string;
    //补充色
    supplementary?: string;
}

/**
 * 图层
 */
export interface Layer {
    //id
    id?: number;
    //名称
    name?: string;
    //可见性
    visible?: boolean;
}

/**
 * 统计信息
 */
export interface Statistic {
    //元素个数
    count?: number;
    //历史记录
    history?: any;
}

/**
 * 基础样式
 */
export interface BaseStyle {
    //内边距
    padding?: string;
    //背景颜色
    backgroundColor?: string;
    //边框
    border?: string;
    //边框样式
    borderStyle?: string;
    //边框颜色
    borderColor?: string;
    //边框圆角
    borderRadius?: string;
    //边框宽度
    borderWidth?: string;
}

/**
 * 元素配置
 */
export interface ElemConfig {
    [key: string]: Object;
}

/**
 * 存储类型
 */
export enum SaveType {
    //本地存储(indexedDB)
    LOCAL = 'local',
    //服务器存储
    SERVER = 'server'
}

/**
 * 项目状态
 */
export enum ProjectState {
    //草稿
    DRAFT = 'draft',
    //发布
    PUBLISH = 'publish',
    //封存
    SEALED = 'sealed'
}

/**
 * 项目配置
 */
export interface ProjectConfig {
    //项目名称
    name?: string;
    //项目描述
    des?: string;
    //项目状态
    state?: ProjectState;
    //创建时间
    createTime?: string;
    //更新时间
    updateTime?: string;
    //元素个数
    elemCount?: number;
    //存储类型
    saveType?: SaveType;
}

/**
 * 背景模式
 */
export enum BackgroundMode {
    //无背景
    NONE,
    //图片背景
    PICTURE,
    //颜色背景
    COLOR
}

/**
 * 背景图重复模式
 */
export enum BackgroundImgRepeat {
    //不重复
    NO_REPEAT = 'no-repeat',
    //铺满
    REPEAT = 'repeat',
    //x轴重复
    REPEAT_X = 'repeat-x',
    //y轴重复
    REPEAT_Y = 'repeat-y'
}

/**
 * 背景颜色模式
 */
export enum BackgroundColorMode {
    //单色
    SINGLE,
    //线性渐变
    LINEAR_GRADIENT,
    //径向渐变
    RADIAL_GRADIENT,
}

/**
 * 背景设置
 */
export interface BackgroundConfig {
    //背景宽
    width?: number;
    //背景高
    height?: number;
    //背景模式
    bgMode?: BackgroundMode;
    //背景图片尺寸
    bgImgSize?: [number, number];
    //背景图片位置
    bgImgPos?: [number, number];
    //背景图片重复方式
    bgImgRepeat?: BackgroundImgRepeat;
    //背景图片url地址
    bgImgUrl?: string;
    //背景图片颜色模式
    bgColorMode?: BackgroundColorMode | undefined;
    //背景颜色
    bgColor?: string;
}

/**
 * 激活元素
 */
export interface ActiveElem {
    //元素id
    id?: number;
    //元素类型
    type?: string;
}

/**
 * 画布配置
 */
export interface CanvasConfig {
    //元素间距
    interval?: number;
    //画布列总数
    columns?: number;
    //元素单位高度
    baseHeight?: number;
    //画布缩放比例
    scale?: number;
    //画布宽
    width?: number;
    //画布高
    height?: number;
}

/**
 * 布局item
 */
export interface LcLayout extends Layout {
    [key: string]: any;
}

/**
 * lc设计器配置
 */
export interface LCDesigner {
    //项目id
    id?: number;
    //画布设置
    canvasConfig?: CanvasConfig;
    //激活状态元素信息
    activeElem?: ActiveElem;
    //背景设置
    bgConfig?: BackgroundConfig;
    //项目设置
    projectConfig?: ProjectConfig;
    //元素样式
    elemConfigs?: { [key: string]: ElemConfig };
    //布局信息
    layoutConfigs?: any[];
    //统计信息
    statisticInfo?: Statistic;
    //图层信息
    layers?: Layer[];
    //主题
    theme?: Theme;
    //编组
    group?: any;
    //联动配置
    linkage?: any;
    //条件配置
    condition?: any;
    //扩展参数
    extendParams?: any;
}
