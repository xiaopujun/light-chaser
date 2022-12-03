export interface CfgItemProps {
    /**
     * 配置项label显示名
     */
    label?: string;
    /**
     * 组件名
     */
    comp?: string;
    /**
     * 是否显示
     */
    visible?: boolean;
    /**
     * 组件配置项
     */
    config?: { [key: string]: string | number | Array<any> | Function | undefined };

}
