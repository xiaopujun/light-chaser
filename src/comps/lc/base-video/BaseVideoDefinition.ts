import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import BaseVideoController, {BaseVideoComponentProps} from "./BaseVideoController.ts";
import baseVideo from './baseVideo.png';
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import {BaseVideoStyleConfig} from "./BaseVideoConfig.tsx";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));

export default class BaseVideoDefinition extends AbstractDesignerDefinition<BaseVideoController, BaseVideoComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "视频",
            compKey: "BaseVideo",
            categorize: "media",
        };
    }

    getChartImg(): string | null {
        return baseVideo;
    }

    getController(): ClazzTemplate<BaseVideoController> | null {
        return BaseVideoController;
    }

    getInitConfig(): BaseVideoComponentProps {
        return {
            base: {
                id: "",
                name: '视频',
                type: 'BaseVideo',
            },
            style: {
                src: undefined,
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
            style: BaseVideoStyleConfig,
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