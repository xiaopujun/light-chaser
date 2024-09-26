import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../../designer/right/MenuType";
import baseTextImg from './base-text.png';
import {BaseTextController} from "./BaseTextController";
import {BaseTextComponentProps} from "./BaseTextComponent";
import {BaseTextStyleConfig} from "./BaseTextConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../../framework/core/AbstractDesignerDefinition.ts";
import DataConfig from "../../../common-component/data-config/DataConfig.tsx";

const BaseInfo = React.lazy(() => import("../../../common-component/base-info/BaseInfo"));
const ThemeConfig = React.lazy(() => import("../../../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../../../common-component/animation-config/AnimationConfig.tsx"));
const FilterConfig = React.lazy(() => import("../../../common-component/filter-config/FilterConfig.tsx"));


export default class BaseTextDefinition extends AbstractDesignerDefinition<BaseTextController, BaseTextComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础文本",
            compKey: "BaseText",
            categorize: "info",
            width: 64,
            height: 26,
        };
    }

    getChartImg(): string | null {
        return baseTextImg;
    }

    getController(): ClazzTemplate<BaseTextController> | null {
        return BaseTextController;
    }

    getInitConfig(): BaseTextComponentProps {
        return {
            base: {
                id: "",
                name: '基础文本',
                type: 'BaseText',
            },
            style: {
                color: '#a7a7a7',
                fontSize: 16,
                alignItems: 'center',
                justifyContent: 'center',
                strokeColor: '#ffffff',
                strokeWidth: 0,
                lineHeight: 1,
                letterSpacing: 0,
            },
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
            data: {
                sourceType: 'static',
                staticData: "基础文本2"
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => item.key !== 'theme');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: BaseTextStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            filter: FilterConfig,
            data: DataConfig
        };
    }


    getEventList(): EventInfo[] {
        const events = super.getEventList();
        return events.concat([
            {
                id: "click",
                name: "点击时",
            },
            {
                id: "dataChange",
                name: "数据变化时"
            }
        ]);
    }
}
