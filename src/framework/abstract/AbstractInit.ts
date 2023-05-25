import {ElemConfig} from "../types/DesignerType";
import {BaseInfoType} from "./AbstractScannerCore";

export abstract class AbstractInit {
    /**
     * 获取基础信息
     */
    abstract getBaseInfo(): BaseInfoType;

    /**
     * 获取组件初始化配置
     */
    abstract getInitConfig(): ElemConfig | Object;

    /**
     * 获取组件图片缩略图
     */
    abstract getChartImg(): any;
}

