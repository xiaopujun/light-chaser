import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import LivePlayerController, {LivePlayerComponentProps} from "./LivePlayerController.ts";
import LivePlayer from './LivePlayer.png';
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import {LivePlayerStyleConfig} from "./LivePlayerConfig.tsx";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));

export default class LivePlayerDefinition extends AbstractDesignerDefinition<LivePlayerController, LivePlayerComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "视频直播",
            compKey: "LivePlayer",
            categorize: "media",
        };
    }

    getChartImg(): string | null {
        return LivePlayer;
    }

    getController(): ClazzTemplate<LivePlayerController> | null {
        return LivePlayerController;
    }

    getInitConfig(): LivePlayerComponentProps {
        return {
            base: {
                id: "",
                name: '视频',
                type: 'LivePlayer',
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
            style: LivePlayerStyleConfig,
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
