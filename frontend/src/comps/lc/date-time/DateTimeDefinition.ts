/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {BaseInfoType, EventInfo, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {MenuInfo} from "../../../designer/right/MenuType";
import DateTimeImg from './date-time.png';
import {DateTimeController} from "./DateTimeController.ts";
import {DateTimeComponentProps, FormatType} from "./DateTimeComponent.tsx";
import {DateTimeConfig} from "./DateTimeConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

export default class DateTimeDefinition extends AbstractDesignerDefinition<DateTimeController, DateTimeComponentProps> {
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
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = DateTimeConfig;
        return menuMapping;
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