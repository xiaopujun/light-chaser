export default interface BaseInit {
    /**
     * 获取组件名称
     */
    getCompName(): string;

    /**
     * 获取组件类型
     */
    getCompType(): string;

    /**
     * 获取组件初始化配置
     */
    getInitConfig(): Object;
}