import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../../designer/right/MenuType";
import BaseIndicatorCardImg from './base-text.png';
import {BaseIndicatorCardController} from "./BaseIndicatorCardController";
import {BaseIndicatorCardComponentProps} from "./BaseIndicatorCardComponent";
import {BaseIndicatorCardStyleConfig} from "./BaseIndicatorCardConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../../common-component/base-info/BaseInfo"));
const ThemeConfig = React.lazy(() => import("../../../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../../../common-component/animation-config/AnimationConfig.tsx"));
const FilterConfig = React.lazy(() => import("../../../common-component/filter-config/FilterConfig.tsx"));
const DataConfig = React.lazy(() => import("../../../common-component/data-config/DataConfig.tsx"));


export default class BaseIndicatorCardDefinition extends AbstractDesignerDefinition<BaseIndicatorCardController, BaseIndicatorCardComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础指标卡",
            compKey: "BaseIndicatorCard",
            categorize: "info",
            width: 64,
            height: 26,
        };
    }

    getChartImg(): string | null {
        return BaseIndicatorCardImg;
    }

    getController(): ClazzTemplate<BaseIndicatorCardController> | null {
        return BaseIndicatorCardController;
    }

    getInitConfig(): BaseIndicatorCardComponentProps {
        return {
            base: {
                id: "",
                name: '基础指标卡',
                type: 'BaseIndicatorCard',
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
                staticData: "123,456"
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => item.key !== 'theme');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: BaseIndicatorCardStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            filter: FilterConfig,
            data: DataConfig,
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
