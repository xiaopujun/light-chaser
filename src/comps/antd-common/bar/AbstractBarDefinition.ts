import React from "react";
import {
    AbstractComponentDefinition,
    ActionInfo,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractComponentDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdCommonBar, {AntdBarProps} from "../../antd-common/bar/AntdCommonBar";
import {AntdBarFieldMapping} from "./AntdBarCommonConfig";
import AbstractController from "../../../framework/core/AbstractController";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdBarCommonStyleConfig = React.lazy(() => import("./AntdBarCommonConfig").then((module) => ({default: module.AntdBarCommonStyleConfig})));
// const AntdFieldMapping = React.lazy(() => import("../config/field-mapping/AntdFieldMapping"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


abstract class AbstractBarDefinition extends AbstractComponentDefinition<AntdCommonBar, AntdBarProps> {

    getComponent(): ClazzTemplate<AntdCommonBar> | null {
        return AntdCommonBar;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            info: BaseInfo,
            data: DataConfig,
            style: AntdBarCommonStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdBarFieldMapping,
        };
    }


    getEventList(): Array<EventInfo> {
        return [
            {
                id: "globalClick",
                name: "点击整个组件时",
            },
            {
                id: "legendClick",
                name: "点击图例时"
            },
            {
                id: "elementNameClick",
                name: "点击图例名称时"
            },
            {
                id: "tooltipShow",
                name: "工具标签显示时"
            },
            {
                id: "tooltipHide",
                name: "工具标签隐藏时"
            }
        ]
    }

    getActionList(): Array<ActionInfo> {
        return [
            {
                name: "显示",
                id: "show",
                handler: (controller: AbstractController, params?: any) => {
                    console.log("显示动作来了");
                }
            },
            {
                name: "隐藏",
                id: "hide",
                handler: (controller: AbstractController, params?: any) => {
                    controller.container!.style.display = "none";
                }
            }
        ]
    }
}

export default AbstractBarDefinition;
