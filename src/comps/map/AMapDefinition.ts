import aMapImage from './a-map.png';
import {AMapController} from "./AMapController.ts";
import {AMapConfig} from "./AMapConfig.tsx";
import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../framework/core/AbstractDefinition.ts";
import {AMapComponentProps} from "./AMapComponent.tsx";
import {ClazzTemplate} from "../common-component/CommonTypes.ts";
import {MenuInfo} from "../../designer/right/MenuType.ts";
import React from "react";
import AbstractDesignerDefinition from "../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../common-component/base-info/BaseInfo"));
const ThemeConfig = React.lazy(() => import("../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../common-component/animation-config/AnimationConfig.tsx"));
const FilterConfig = React.lazy(() => import("../common-component/filter-config/FilterConfig.tsx"));


export default class AMapDefinition extends AbstractDesignerDefinition<AMapController, AMapComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "自定义高德地图",
            compKey: "AMap",
            categorize: "map",
        };
    }

    getChartImg(): string | null {
        return aMapImage;
    }

    getController(): ClazzTemplate<AMapController> | null {
        return AMapController;
    }

    getInitConfig(): AMapComponentProps {
        return {
            base: {
                id: "",
                name: '自定义高德地图',
                type: 'AMap',
            },
            style: {
                key: "",
                securityJsCode: "",
                customCode: "function(container, AMap, bpTriggers) {\n" +
                    "    let map = new AMap.Map(container, {\n" +
                    "        zoom: 11.43,\n" +
                    "        center: [120.2446746826172, 30.199146446037616],\n" +
                    "        pitch: 55,\n" +
                    "        rotation: 20,\n" +
                    "        showLabel: true,\n" +
                    "        viewMode: '3D',\n" +
                    "        mapStyle: 'amap://styles/dark',\n" +
                    "    });\n" +
                    "    return map;\n" +
                    "}"
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
            style: AMapConfig,
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