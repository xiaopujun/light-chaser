import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseIframeImg from './base-iframe.png';
import {BaseIframeController} from "./BaseIframeController";
import {BaseIframeComponentProps} from "./BaseIframeComponent";
import {BaseIframeStyleConfig} from "./BaseIframeConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class BaseIframeDefinition extends AbstractDesignerDefinition<BaseIframeController, BaseIframeComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "基础iframe",
            compKey: "BaseIframe",
            categorize: "web",
        };
    }

    getChartImg(): string | null {
        return baseIframeImg;
    }

    getController(): ClazzTemplate<BaseIframeController> | null {
        return BaseIframeController;
    }

    getInitConfig(): BaseIframeComponentProps {
        return {
            base: {
                id: "",
                name: '基础iframe',
                type: 'BaseIframe',
            },
            style: {
                src: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((menu) => menu.key !== 'data' && menu.key !== 'theme');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        return {
            base: BaseInfo,
            style: BaseIframeStyleConfig,
            filter: FilterConfig
        };
    }

    getEventList(): EventInfo[] {
        return [
            ...super.getEventList(),
            {
                id: "load",
                name: "iframe加载完成时",
            }
        ]
    }
}