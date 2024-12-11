import {BPNodeLayoutType, IBPLine} from "./blueprint/manager/BluePrintManager.ts";
import {IFilter} from "./manager/FilterManager.ts";

/**
 * 主题
 */
export interface ThemeColors {
    //主体色
    main?: string;
    //主文字
    mainText?: string;
    //背景色
    subText?: string;
    //背景色
    background?: string;
    //补充一
    supplementFirst?: string;
    //补充二
    supplementSecond?: string;
}

export interface ThemeItemType {
    colors: ThemeColors;
    name: string;
    id: string;
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
    //自动刷新
    autoFlush?: boolean;
    //刷新频率
    frequency?: number;
    //过滤器
    filter?: string;
}

export interface IDatabase {
    //数据库类型
    targetDb?: string;
    //查询sql语句
    sql?: string;
    //自动刷新
    autoFlush?: boolean;
    //刷新频率
    frequency?: number;
    //过滤器
    filter?: string;
}

/**
 * 数据配置项
 */
export interface DataConfigType {
    //数据来源方式
    sourceType?: 'static' | 'api' | 'database' | 'excel';
    //静态数据(除了存放静态数据外，该属性还有动态数据的中转站的作用），其他动态数据获取到后统一都存放在静态数据中，需要使用到的时候再从静态数据中获取
    staticData?: any;
    apiData?: APIConfig;
    database?: IDatabase;
}

export interface IFilterConfigType {
    enable?: boolean;
    blur?: number;
    brightness?: number;
    contrast?: number;
    opacity?: number;
    saturate?: number;
    hueRotate?: number;
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
 * 设计器模式
 */
export enum DesignerMode {
    //编辑模式
    EDIT = '0',
    //展示模式
    VIEW = '1',
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
export interface IProjectInfo {
    //项目id
    id?: string;
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
    //项目封面
    cover?: string;
    //项目数据json
    dataJson?: string;
}

export type AdaptationType = 'scale' | 'full-screen' | 'full-x' | 'full-y' | 'none';

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
    //屏幕适配
    adaptationType?: AdaptationType;
}


export interface LayerManagerDataType {
    //元素样式
    elemConfigs?: { [key: string]: Record<string, any> };
    //图层信息
    layerConfigs?: { [key: string]: ILayerItem };
    //图层头指针
    layerHeader?: string;
    //图层尾指针
    layerTail?: string;
}


export interface FilterManagerDataType {
    filters: Record<string, IFilter>;
}

export interface BluePrintManagerDataType {
    //蓝图节点布局
    bpNodeLayoutMap?: Record<string, BPNodeLayoutType>;
    //蓝图节点配置
    bpNodeConfigMap?: Record<string, any>;
    //蓝图线条
    bpLines?: Record<string, IBPLine>;
    //蓝图锚点之间的连线关系映射
    bpAPMap?: Record<string, string[]>;
    //蓝图锚点与线条之间的关系映射
    bpAPLineMap?: Record<string, string[]>;
}

/**
 * lc设计器配置
 */
export interface ProjectDataType {
    //项目id
    id?: string;
    //画布设置
    canvasManager?: CanvasConfig;
    //项目设置
    projectManager?: IProjectInfo;
    //全局主题
    themeManager?: Array<ThemeItemType>;
    //图层管理
    layerManager?: LayerManagerDataType;
    //蓝图管理
    bluePrintManager?: BluePrintManagerDataType;
    //过滤器管理
    filterManager?: FilterManagerDataType;
}

export interface ILayerItem {
    //唯一标识
    id?: string | undefined;
    //组件名称
    name?: string | undefined;
    //组件类型
    type?: string | undefined;
    //宽度
    width?: number;
    //高度
    height?: number;
    //坐标
    x?: number;
    //y坐标
    y?: number;
    //是否隐藏
    hide?: boolean;
    //是否锁定
    lock?: boolean;
    //顺序
    order?: number;
    //父图层id
    pid?: string;
    //子图层列表
    children?: ILayerItem[];
    //子图层头指针
    childHeader?: string;
    //子图层尾指针
    childTail?: string;
    //前指针
    prev?: string;
    //后指针
    next?: string;
}

/**
 * 分页数据
 */
export interface IPage<T = {}> {
    records: T[];
    total: number;
    size: number;
    current: number;
}

export interface IPageParam {
    current: number;
    size: number;
    searchValue?: string;
}