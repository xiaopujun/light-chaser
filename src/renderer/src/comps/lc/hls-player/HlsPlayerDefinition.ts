import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import HlsPlayerImg from './hls-player.png';
import {HlsPlayerController} from "./HlsPlayerController.ts";
import {HlsPlayerComponentProps} from "./HlsPlayerComponent.tsx";
import {HlsPlayerConfig} from "./HlsPlayerConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";
import {lazy} from "react";

const BaseInfo = lazy(() => import("../../common-component/base-info/BaseInfo"));
const AnimationConfig = lazy(() => import("../../common-component/animation-config/AnimationConfig.tsx"));
const FilterConfig = lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class HlsPlayerDefinition extends AbstractDesignerDefinition<HlsPlayerController, HlsPlayerComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "HLS视频流",
            compKey: "HlsPlayer",
            categorize: "media",
        };
    }

    getChartImg(): string | null {
        return HlsPlayerImg;
    }

    getController(): ClazzTemplate<HlsPlayerController> | null {
        return HlsPlayerController;
    }

    getInitConfig(): HlsPlayerComponentProps {
        return {
            base: {
                id: "",
                name: 'HLS视频流',
                type: 'HlsPlayer',
            },
            style: {
                url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
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
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'data' && item.key !== 'mapping'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: HlsPlayerConfig,
            animation: AnimationConfig,
            filter: FilterConfig
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