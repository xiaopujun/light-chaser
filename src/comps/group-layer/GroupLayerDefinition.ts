import {
    AbstractDefinition,
    ActionInfo,
    BaseInfoType,
    MenuToConfigMappingType
} from "../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../common-component/common-types";
import {MenuInfo} from "../../designer/right/MenuType";
import BaseInfo from "../common-component/base-info/BaseInfo";
import GroupLayerController, {GroupLayerProps} from "./GroupLayerController";
import AbstractController from "../../framework/core/AbstractController.ts";
import {SettingOne} from "@icon-park/react";

export default class GroupLayerDefinition extends AbstractDefinition<GroupLayerController, GroupLayerProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "",
            compKey: "group",
        };
    }

    getChartImg(): string | null {
        return null;
    }

    getController(): ClazzTemplate<GroupLayerController> | null {
        return null;
    }

    getInitConfig(): GroupLayerProps {
        return {
            base: {
                id: "",
                name: '分组图层',
                type: 'group',
            }
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return [
            {
                icon: SettingOne,
                key: 'base',
                name: '基础',
            }
        ];
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
        };
    }

    getActionList(): ActionInfo[] {
        return [
            {
                name: "显示",
                id: "show",
                handler: (controller: AbstractController) => {
                    (controller as GroupLayerController).show();
                }
            },
            {
                name: "隐藏",
                id: "hide",
                handler: (controller: AbstractController) => {
                    (controller as GroupLayerController).hide();
                }
            }
        ];
    }

}