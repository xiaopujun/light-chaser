import {MenuInfo} from "../../designer/right/MenuType";
import AbstractController from "./AbstractController";
import React from "react";
import {ClazzTemplate} from "../../comps/common-component/common-types";

export type MenuToConfigMappingType = { [key: string]: React.ComponentType<any> };

export interface ActionInfo {
    name: string;
    id: string;
    handler: (controller: AbstractController, params?: any) => void;
}

export interface EventInfo {
    id?: string;
    name?: string;
}

export interface ICategorize {
    key: string;
    name: string;
    icon?: React.ComponentType;
    parentKey?: string;
}

/**
 * 组件基础信息
 */
export interface BaseInfoType {
    /**
     * 组件显示名称
     */
    compName: string;
    /**
     * 组件标识
     */
    compKey: string;
    /**
     * 主分类
     */
    categorize?: string;
    /**
     * 子分类
     */
    subCategorize?: string;
    /**
     * 版本
     */
    version?: string;
    /**
     * 初始宽度
     */
    width?: number;
    /**
     * 初始高度
     */
    height?: number;
}

/**
 * 自动扫描抽象组件定义核心类。
 * 对于所有继承并实现了该抽象类的子类，都会被自动扫描到并注册到设计器中。
 * 因此，所有要接入设计器的react组件都应该按照该类的约定实现其所有的方法。
 *
 * 泛型说明：
 * C: 组件控制器类，用于指定当前组件定义对应的控制器类
 * P: 组件配置类型，用于指定当前组件的配置数据(config属性的类型)
 */
export abstract class AbstractDefinition<C extends AbstractController = AbstractController, P = any> {

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
    abstract getController(): ClazzTemplate<C> | null;

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

    /**
     * 返回当前组件能触发的事件列表
     */
    getEventList(): EventInfo[] {
        return [
            {
                id: "loaded",
                name: "组件加载完成时",
            }
        ];
    }

    /**
     * 返回当前组件能接受的动作列表
     */
    getActionList(): ActionInfo[] {
        return [
            {
                name: "显示",
                id: "show",
                handler: (controller: AbstractController, params?: object) => {
                    controller.container!.style.display = "block";
                }
            },
            {
                name: "隐藏",
                id: "hide",
                handler: (controller: AbstractController, params?: object) => {
                    controller.container!.style.display = "none";
                }
            },
            {
                name: "更新组件配置",
                id: "updateConfig",
                handler: (controller: AbstractController, params?: object) => {
                    controller.update(params);
                }
            }
        ];
    }

    /**
     * 定义组件主分类
     */
    getCategorize(): ICategorize | null {
        return null;
    }

    /**
     * 定义组件子分类
     */
    getSubCategorize(): ICategorize | null {
        return null;
    }


}

