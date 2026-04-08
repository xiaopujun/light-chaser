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
import digitalFlipperImg from './digital-flipper.png';
import {DigitalFlipperController} from "./DigitalFlipperController";
import {DigitalFlipperConfig} from "./DigitalFlipperConfig";
import {DigitalFlipperComponentProps} from "./DigitalFlipperComponent";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";

export default class DigitalFlipperDefinition extends AbstractDesignerDefinition<DigitalFlipperController, DigitalFlipperComponentProps> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "数字翻牌器",
            compKey: "DigitalFlipper",
            categorize: "info",
            width: 200,
            height: 50,
        };
    }

    getChartImg(): string | null {
        return digitalFlipperImg;
    }

    getController(): ClazzTemplate<DigitalFlipperController> | null {
        return DigitalFlipperController;
    }

    getInitConfig(): DigitalFlipperComponentProps {
        return {
            base: {
                id: "",
                name: '数字翻牌器',
                type: 'DigitalFlipper',
            },
            style: {
                fontSize: 20,
                fontWeight: 500,
                fontFamily: 'Microsoft YaHei',
                color: '#ffffff',
                type: 'caper',
                justifyContent: 'center',
                alignItems: 'center'
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
            data: {
                sourceType: 'static',
                staticData: 123456789
            }
        };
    }

    getMenuList(): Array<MenuInfo> {
        return super.getMenuList().filter((item: MenuInfo) => (item.key !== 'theme'));
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = DigitalFlipperConfig;
        return menuMapping;
    }


    getEventList(): EventInfo[] {
        return [
            ...super.getEventList(),
            {
                id: "click",
                name: "点击时",
            },
            {
                id: "dataChange",
                name: "数据变化时"
            }
        ]
    }
}