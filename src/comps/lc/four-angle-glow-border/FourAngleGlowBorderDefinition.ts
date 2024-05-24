import {
    AbstractDefinition,
    BaseInfoType,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import fourAngleGlowBorderImg from './four-angle-glow-border.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {FourAngleGlowBorderController, FourAngleGlowProps} from "./FourAngleGlowBorderController";
import {FourAngleGlowBorderConfig} from "./FourAngleGlowBorderConfig";
import React from "react";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));


export default class FourAngleGlowBorderDefinition extends AbstractDefinition<FourAngleGlowBorderController, FourAngleGlowProps> {
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
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: FourAngleGlowBorderConfig,
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