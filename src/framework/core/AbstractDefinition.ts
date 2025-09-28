/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {MenuInfo} from "../../designer/right/MenuType";
import AbstractController from "./AbstractController";
import React, {ComponentType} from "react";
import {ClazzTemplate} from "../../comps/common-component/CommonTypes.ts";
import AbstractDesignerController from "./AbstractDesignerController";

export type MenuToConfigMappingType = Record<string, React.ComponentType<any>>;

export interface ActionInfo {
    name: string;
    id: string;
    handler: (controller: AbstractDesignerController, params?: any) => void;
}

export interface EventInfo {
    id?: string;
    name?: string;
}

export interface ICategorize {
    key: string;
    name: string;
    icon?: ComponentType;
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
     * 返回组件的初始配置，用于在画布渲染组件时的初始化组件数据
     */
    abstract getInitConfig(): P;

    /**
     * 返回React组件Controller控制器的类模板，在画布中创建组件实例时会根据该方法的返回值实例化组件控制器并保存。
     * 后续将通过该控制器的实例对象来控制组件的生命周期
     */
    abstract getController(): ClazzTemplate<C> | null;

    /**
     * 返回组件图片缩略图，在组件列表中展示时使用。图片尺寸越小越好
     */
    abstract getChartImg(): string | null;

    /**
     * 返回右侧配置菜单列表，双击组件时需要展示该菜单列表
     */
    abstract getMenuList(): Array<MenuInfo>;

    /**
     * 返回右侧菜单与对应配置内容组件的映射关系
     */
    abstract getMenuToConfigContentMap(): MenuToConfigMappingType;

    /**
     * 返回当前组件能触发的事件列表, 在蓝图图层节点中使用
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
     * 返回当前组件能接受的动作列表，在蓝图图层节点中使用。可据此实现对组件的操作
     */
    getActionList(): ActionInfo[] {
        return [
            {
                name: "显示",
                id: "show",
                handler: (controller: AbstractDesignerController) => {
                    controller.container!.style.visibility = "visible";
                }
            },
            {
                name: "隐藏",
                id: "hide",
                handler: (controller: AbstractDesignerController) => {
                    controller.container!.style.visibility = "hidden";
                }
            },
            {
                name: "更新组件样式",
                id: "updateConfig",
                handler: (controller: AbstractDesignerController, params?: object) => {
                    controller.update(params);
                }
            },
            {
                name: "更新组件数据",
                id: "updateData",
                handler: (controller: AbstractDesignerController, params?: object) => {
                    controller.changeData(params);
                }
            }
        ];
    }

    /**
     * 自定义组件主分类，如需要创建一个设计器没有提供的主分类，则实现该方法
     */
    getCategorize(): ICategorize | null {
        return null;
    }

    /**
     * 自定义组件子分类,如需要创建一个设计器没有提供的子分类，则实现该方法
     */
    getSubCategorize(): ICategorize | null {
        return null;
    }
}

