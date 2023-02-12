export default interface BaseInit {
    /**
     * 获取基础信息
     */
    getBaseInfo(): BaseInfo;

    /**
     * 获取组件初始化配置
     */
    getInitConfig(): Object;
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