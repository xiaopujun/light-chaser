import {
    AbstractDefinition,
    BaseInfoType,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import textScrollerImg from './text-scroller.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {TextScrollerController} from "./TextScrollerController.ts";
import {TextScrollerComponentProps} from "./TextScrollerComponent.tsx";
import {TextScrollerConfig} from "./TextScrollerConfig.tsx";
import React from "react";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig.tsx"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig.tsx"));


export default class TextScrollerDefinition extends AbstractDefinition<TextScrollerController, TextScrollerComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "文字弹幕",
            compKey: "TextScroller",
            categorize: "info",
            subCategorize: "text",
            width: 320,
            height: 26,
        };
    }

    getChartImg(): string | null {
        return textScrollerImg;
    }

    getController(): ClazzTemplate<TextScrollerController> | null {
        return TextScrollerController;
    }

    getInitConfig(): TextScrollerComponentProps {
        return {
            base: {
                id: "",
                name: '文字弹幕',
                type: 'TextScroller',
            },
            style: {
                speed: 10,
                fontSize: 16,
                fontWeight: 500,
                color: '#fff',
                fontFamily: 'Arial',
            },
            data: {
                sourceType: 'static',
                staticData: '文字弹幕'
            }
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: TextScrollerConfig,
            animation: AnimationConfig,
            data: DataConfig,
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