export abstract class AbstractInit {
    /**
     * 获取基础信息
     */
    abstract getBaseInfo(): BaseInfo;

    /**
     * 获取组件初始化配置
     */
    abstract getInitConfig(): Object;

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
     * 组件名称
     */
    value: string;
    /**
     * 组件类型
     */
    typeInfo: TypeInfo;
}


interface TypeInfo {
    name: string;
    type: string;
}