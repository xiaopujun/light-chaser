import {MenuInfo} from "../../designer/right/MenuType";
import {BaseInfoType} from "../../designer/DesignerType";
import AbstractComponent from "./AbstractComponent";
import React from "react";
import {ClazzTemplate} from "../../comps/common-component/common-types";
import {ConfigType} from "../../designer/right/ConfigType";

export type MenuToConfigMappingType<T extends ConfigType = ConfigType> = { [key: string]: React.ComponentType<T> };

/**
 * 自动扫描抽象组件定义核心类。
 * 对于所有继承并实现了该抽象类的字类，都会被自动扫描到并注册到系统中。
 * 因此，所有要接入设计器的react组件都应该按照该类的约定实现所有的方法。
 *
 * 泛型说明：
 * C: 组件类，用于指定当前组件定义对应的实际组件类
 * M: 菜单配置映射，用于指定当前组件配置菜单对应的配置组件的映射关系
 * P: 组件配置类型，用于指定当前组件的配置数据(config属性的类型)
 */
export abstract class AbstractCustomComponentDefinition<C extends AbstractComponent = AbstractComponent, P = any> {

    /**
     * 返回组件基础信息，用于在组件列表中展示
     */
    abstract getBaseInfo(): BaseInfoType ;

    /**
     * 返回组件的初始配置，用于在设计器拖拽创建组件实例时使用
     */
    abstract getInitConfig(): P;

    /**
     * 返回React组件的类模板，在设计器拖拽创建组件实例时会使用到
     */
    abstract getComponent(): ClazzTemplate<C> | null;

    /**
     * 返回组件图片缩略图，在组件列表中展示时使用。图片不要超过300kb,否则会影响设计器的加载速度
     */
    abstract getChartImg(): string | null;

    /**
     * 返回右侧菜单列表，双击组件时需要展示菜单列表
     */
    abstract getMenuList(): Array<MenuInfo> | null;

    /**
     * 返回右侧菜单对应的具体配置内容。这个返回结果是一个映射关系。以对象形式返回
     */
    abstract getMenuToConfigContentMap(): MenuToConfigMappingType | null;

}

