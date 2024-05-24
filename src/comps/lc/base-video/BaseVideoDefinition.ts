import {
    AbstractDefinition,
    BaseInfoType,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import BaseVideoController, {BaseVideoComponentProps} from "./BaseVideoController.ts";
import baseVideo from './baseVideo.png';
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseVideoStyleConfig} from "./BaseVideoConfig.tsx";
import React from "react";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));

export default class BaseVideoDefinition extends AbstractDefinition<BaseVideoController, BaseVideoComponentProps> {
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
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: BaseVideoStyleConfig,
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