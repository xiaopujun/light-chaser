/**
 * redux-action类型
 */
export interface Action {
    type: string;  //操作
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


/**
 * 图标属性配置配置
 */
interface ChartConfigsProps {
    baseInfo?: {
        id?: string | number;
        name?: string;
        type?: string;
        desc?: string;
    };
    baseStyle?: {
        padding?: string;
        bgColor?: string;
        border?: string;
        borderType?: string;
        borderRadio?: number;
    };
    chartProps?: any;
    dataConfig?: {
        dataSourceType: string;//手动、excel、接口、数据库、
        flashFrequency: string | number;
        requestType: string;
    };
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
     * 全局配置
     */
    globalSet: {
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
    },
    /**
     * 激活状态属性
     */
    active: ActiveProps;
    /**
     * 图表配置
     */
    chartConfigs: {
        [key: string | number]: ChartConfigsProps;
    };
    /**
     * 布局配置
     */
    layoutConfigs: Array<any>;
    /**
     * 右滑框配置
     */
    rightDialog: {
        visible: boolean;
    }
}