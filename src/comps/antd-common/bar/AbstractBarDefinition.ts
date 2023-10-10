import React from "react";
import {
    AbstractComponentDefinition,
    MenuToConfigMappingType,
    OperateStreamNode
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


    getEventList(): Array<OperateStreamNode> {
        return [
            {
                name: "点击时",
                key: "click",
                handler: (controller: AbstractController, params?: any) => {
                    console.log("点击时");
                }
            },
            {
                name: "数据项选中时",
                key: "select",
                handler: (controller: AbstractController, params?: any) => {
                    console.log("数据项选中时");
                }
            }
        ]
    }

    getActionList(): Array<OperateStreamNode> {
        return [
            {
                name: "显示",
                key: "show",
                handler: (controller: AbstractController, params?: any) => {
                    console.log("显示");
                }
            },
            {
                name: "隐藏",
                key: "hide",
                handler: (controller: AbstractController, params?: any) => {
                    console.log("隐藏");
                }
            }
        ]
    }
}

export default AbstractBarDefinition;
