import {MenuInfo} from "../types/MenuType";
import React from "react";
import {ElemConfig} from "../types/DesignerType";

export abstract class AbstractAutoScannerCore {

    /**
     * 获取组件标识
     */
    abstract getKey(): string;

    /**
     * 获取右侧菜单列表
     */
    abstract getMenuList(): Array<MenuInfo>;

    /**
     * 获取右侧菜单对应的配置内容的映射关系
     */
    abstract getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any };

    /**
     * 获取基础信息
     */
    abstract getBaseInfo(): BaseInfoType | null;

    /**
     * 获取组件初始化配置
     */
    abstract getInitConfig(): ElemConfig | Object | null

    /**
     * 获取组件图片缩略图
     */
    abstract getChartImg(): any;

    /**
     * 获取组件
     */
    abstract getComponent(): React.Component | React.FC | any;
}

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