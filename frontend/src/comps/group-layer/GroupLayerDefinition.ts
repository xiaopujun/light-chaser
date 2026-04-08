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

import {AbstractDefinition, ActionInfo, BaseInfoType, MenuToConfigMappingType} from "../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../common-component/CommonTypes.ts";
import {MenuInfo} from "../../designer/right/MenuType";
import GroupLayerController, {GroupLayerProps} from "./GroupLayerController";
import AbstractController from "../../framework/core/AbstractController.ts";
import {SettingOne} from "@icon-park/react";
import React from "react";


const BaseInfo = React.lazy(() => import("../common-component/base-info/BaseInfo"));

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

    getMenuList(): Array<MenuInfo> {
        return [
            {
                icon: SettingOne,
                key: 'base',
                name: '基础',
            }
        ];
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
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
                    (controller as GroupLayerController).setVisible(true);
                }
            },
            {
                name: "隐藏",
                id: "hide",
                handler: (controller: AbstractController) => {
                    (controller as GroupLayerController).setVisible(false);
                }
            }
        ];
    }

}