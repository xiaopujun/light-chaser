import {
    AbstractDefinition,
    BaseInfoType,
    EventInfo,
    MenuToConfigMappingType
} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/common-types";
import {MenuInfo} from "../../../designer/right/MenuType";
import DateTimeImg from './date-time.png';
import {getDefaultMenuList} from "../../../designer/right/util";
import {DateTimeController} from "./DateTimeController.ts";
import {DateTimeComponentProps, FormatType} from "./DateTimeComponent.tsx";
import {DateTimeConfig} from "./DateTimeConfig.tsx";
import React from "react";

const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig.tsx"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig.tsx"));
const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig.tsx"));


export default class DateTimeDefinition extends AbstractDefinition<DateTimeController, DateTimeComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "当前时间",
            compKey: "DateTime",
            categorize: "info",
            subCategorize: "text",
            width: 320,
            height: 26,
        };
    }

    getChartImg(): string | null {
        return DateTimeImg;
    }

    getController(): ClazzTemplate<DateTimeController> | null {
        return DateTimeController;
    }

    getInitConfig(): DateTimeComponentProps {
        return {
            base: {
                id: "",
                name: '当前时间',
                type: 'DateTime',
            },
            style: {
                fontSize: 16,
                fontWeight: 500,
                color: '#fff',
                fontFamily: 'Arial',
                alignItems: 'center',
                justifyContent: 'center',
                letterSpacing: '1',
                formatType: FormatType.CN
            },
        };
    }

    getMenuList(): Array<MenuInfo> | null {
        return getDefaultMenuList().filter((item: MenuInfo) => (item.key !== 'theme' && item.key !== 'mapping' && item.key !== 'data'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            style: DateTimeConfig,
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