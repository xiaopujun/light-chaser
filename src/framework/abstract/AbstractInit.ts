import {ElemConfig} from "../types/DesignerType";

export abstract class AbstractInit {
    /**
     * 获取基础信息
     */
    abstract getBaseInfo(): BaseInfo;

    /**
     * 获取组件初始化配置
     */
    abstract getInitConfig(): ElemConfig | Object;

    /**
     * 获取组件图片缩略图
     */
    abstract getChartImg(): any;
}

export interface BaseInfo {
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