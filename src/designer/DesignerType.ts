/**
 * 主题
 */
import {MovableItemType} from "../lib/lc-movable/types";

export interface ThemeColors {
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

export interface ThemeItemType {
    colors: ThemeColors;
    name: string;
    des: string;
    id: string;
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

export interface APIConfig {
    //地址
    url?: string;
    //请求方式
    method?: 'get' | 'post' | 'put' | 'delete';
    //请求头
    header?: any;
    //请求参数
    params?: any;
    //刷新频率
    flashFrequency?: number;
}

/**
 * 静态数据配置
 */
export interface StaticConfig {
    //数据
    data?: any;
}

/**
 * 数据配置项
 */
export interface DataConfigType {
    //数据来源方式
    dataSource?: 'static' | 'api' | 'database' | 'excel';
    staticData?: StaticConfig;
    apiData?: APIConfig;
    databaseData?: any;
    excelData?: any;
}

/**
 * 数据配置验证回调
 */
export interface DataConfigVerifyCallback {
    staticDataVerify?: (data: any) => string | boolean;
}

/**
 * 元素配置
 */
export interface ElemConfig {
    [key: string]: any;

    info?: Object;
    style?: Object;
    data?: DataConfigType;
    animation?: Object;
    theme?: Object;
}

/**
 * 存储类型
 */
export enum SaveType {
    //本地存储(indexedDB)
    LOCAL = '0',
    //服务器存储
    SERVER = '1'
}

/**
 * 项目状态
 */
export enum ProjectState {
    //草稿
    DRAFT = '0',
    //发布
    PUBLISH = '1',
    //封存
    SEALED = '2'
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
    //存储类型
    saveType?: SaveType;
    //编辑模式下实时刷新数据
    realTimeRefresh?: boolean;
    //项目截图
    screenshot?: string;
}

/**
 * 背景模式
 */
export enum BackgroundMode {
    //无背景
    NONE = '0',
    //图片背景
    PICTURE = '1',
    //颜色背景
    COLOR = '2'
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
    SINGLE = '0',
    //线性渐变
    LINEAR_GRADIENT = '1',
    //径向渐变
    RADIAL_GRADIENT = '2',
}

/**
 * 背景设置
 */
export interface BackgroundConfig {
    //背景宽
    width: number;
    //背景高
    height: number;
    //背景模式
    bgMode: BackgroundMode;
    bgImg: {
        //背景图片尺寸
        bgImgSize: [number, number];
        //背景图片位置
        bgImgPos: [number, number];
        //背景图片重复方式
        bgImgRepeat: BackgroundImgRepeat;
        //背景图片url地址
        bgImgUrl: string;
    },
    bgColor: {
        //背景图片颜色模式
        bgColorMode: BackgroundColorMode;
        single: {
            color: string,//单色背景颜色},
        },
        linearGradient: {
            color: string,
            angle: number,
            colorArr: string[]
        },
        radialGradient: {
            color: string,
            colorArr: string[]
        },
    }
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
    //开启栅格化
    rasterize?: boolean;
    //栅格化拖拽步长
    dragStep?: number;
    //栅格化缩放步长
    resizeStep?: number;
    //画布宽
    width?: number;
    //画布高
    height?: number;
}

/**
 * 组件基础信息
 */
export interface BaseInfoType {
    /**
     * 组件显示名称
     */
    name: string;
    /**
     * 组件标识
     */
    key: string;
    /**
     * 类型名称
     */
    typeName: string;
    /**
     * 类型标识
     */
    typeKey: string;
    /**
     * 来源名称
     */
    sourceName: string;
    /**
     * 来源标识
     */
    sourceKey: string;
}

/**
 * lc设计器配置
 */
export interface DesignerType {
    //项目id
    id?: number;
    //画布设置
    canvasConfig?: CanvasConfig;
    //激活状态元素信息
    activeElem?: ActiveElem;
    //项目设置
    projectConfig?: ProjectConfig;
    //元素样式
    elemConfigs?: { [key: string]: ElemConfig };
    //布局信息
    layoutConfigs?: { [key: string]: MovableItemType };
    //统计信息
    statisticInfo?: Statistic;
    //图层信息
    layers?: Layer[];
    //主题
    themeConfig?: Array<ThemeItemType>;
    //编组
    group?: any;
    //联动配置
    linkage?: any;
    //条件配置
    condition?: any;
    //扩展参数
    extendParams?: any;
}
