import {BaseInfoType, ClazzTemplate, EventInfo, MenuToConfigMappingType} from "../../../designer/DesignerType.ts";

import {MenuInfo} from "../../../designer/right/MenuType";
import baseColorBlockImg from './screen-reference.png';
import {ScreenReferenceController} from "./ScreenReferenceController.ts";
import {ScreenReferenceComponentProps} from "./ScreenReferenceComponent.tsx";
import {ScreenReferenceConfig} from "./ScreenReferenceConfig.tsx";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig.tsx"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class ScreenReferenceDefinition extends AbstractDesignerDefinition<ScreenReferenceController, ScreenReferenceComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "大屏引用",
            compKey: "ScreenReference",
            categorize: "other",
        };
    }

    getChartImg(): string | null {
        return baseColorBlockImg;
    }

    getController(): ClazzTemplate<ScreenReferenceController> | null {
        return ScreenReferenceController;
    }

    getInitConfig(): ScreenReferenceComponentProps {
        return {
            base: {
                id: "",
                name: '大屏引用',
                type: 'ScreenReference',
            },
            style: {},
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
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: ScreenReferenceConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            filter: FilterConfig
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