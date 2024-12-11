import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import fourAngleGlowBorderImg from './four-angle-glow-border.png';
import {FourAngleGlowBorderController, FourAngleGlowProps} from "./FourAngleGlowBorderController";
import {FourAngleGlowBorderConfig} from "./FourAngleGlowBorderConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class FourAngleGlowBorderDefinition extends AbstractDesignerDefinition<FourAngleGlowBorderController, FourAngleGlowProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "四角辉光边框",
            compKey: "FourAngleGlowBorder",
            categorize: "ornament",
        };
    }

    getChartImg(): string | null {
        return fourAngleGlowBorderImg;
    }

    getController(): ClazzTemplate<FourAngleGlowBorderController> | null {
        return FourAngleGlowBorderController;
    }

    getInitConfig(): FourAngleGlowProps {
        return {
            base: {
                id: "",
                name: '基础色块',
                type: 'BaseColorBlock',
            },
            style: {
                color: '#34e4ff',
                width: 2,
                radius: 4,
                length: 10,
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
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: FourAngleGlowBorderConfig,
            filter:FilterConfig
        };
    }


    getEventList(): EventInfo[] {
        return [
            ...super.getEventList(),
            {
                id: "click",
                name: "点击时",
            }
        ]
    }
}