import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import DynamicPanelImg from './dynamic-panel.png';
import {DynamicPanelController} from "./DynamicPanelController";
import {DynamicPanelComponentProps} from "./DynamicPanelComponent";
import {DynamicPanelStyleConfig} from "./DynamicPanelConfig";
import React from "react";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const FilterConfig = React.lazy(() => import("../../common-component/filter-config/FilterConfig.tsx"));


export default class DynamicPanelDefinition extends AbstractDesignerDefinition<DynamicPanelController, DynamicPanelComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "动态面板",
            compKey: "DynamicPanel",
            categorize: "web",
            subCategorize: "container"
        };
    }

    getChartImg(): string | null {
        return DynamicPanelImg;
    }

    getController(): ClazzTemplate<DynamicPanelController> | null {
        return DynamicPanelController;
    }

    getInitConfig(): DynamicPanelComponentProps {
        return {
            base: {
                id: "",
                name: '基础iframe',
                type: 'DynamicPanel',
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
            style: DynamicPanelStyleConfig,
            filter: FilterConfig
        };
    }

    getEventList(): EventInfo[] {
        const events = super.getEventList();
        return events.concat([
            {
                id: "load",
                name: "iframe加载完成时",
            }
        ]);
    }
}
