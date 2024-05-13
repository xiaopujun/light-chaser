import {
    AbstractDefinition,
    BaseInfoType,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseColorBlockImg from './base-color-block.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseColorBlockController} from "./BaseColorBlockController";
import {BaseColorBlockComponentProps} from "./BaseColorBlockComponent";
import {BaseColorBlockConfig} from "./BaseColorBlockConfig";
import React from "react";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig.tsx"));


export default class BaseColorBlockDefinition extends AbstractDefinition<BaseColorBlockController, BaseColorBlockComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础色块",
            compKey: "BaseColorBlock",
            categorize: "ornament",
        };
    }

    getChartImg(): string | null {
        return baseColorBlockImg;
    }

    getController(): ClazzTemplate<BaseColorBlockController> | null {
        return BaseColorBlockController;
    }

    getInitConfig(): BaseColorBlockComponentProps {
        return {
            base: {
                id: "",
                name: '基础色块',
                type: 'BaseColorBlock',
            },
            style: {
                background: '#009DFF33',
                borderRadius: 0,
                borderWidth: 0,
                borderColor: '#74747400',
                borderStyle: 'none',
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: BaseColorBlockConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }


    getEventList(): EventInfo[] {
        const events = super.getEventList();
        return events.concat([
            {
                id: "click",
                name: "点击时",
            }
        ]);
    }
}