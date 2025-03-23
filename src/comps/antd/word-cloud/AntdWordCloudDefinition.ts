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

import baseWordCloudImg from "./word-cloud.png";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import AntdWordCloudController, {AntdWordCloudProps} from "./AntdWordCloudController.ts";
import {MenuInfo} from "../../../designer/right/MenuType.ts";
import {ClazzTemplate} from "../../common-component/CommonTypes.ts";
import {AntdWordCloudFieldMapping, AntdWordCloudStyle} from "./AntdWordCloudConfig.tsx";
import AbstractDesignerDefinition from "../../../framework/core/AbstractDesignerDefinition.ts";
import {Deeplink} from "@icon-park/react";

class AntdWordCloudDefinition extends AbstractDesignerDefinition<AntdWordCloudController, AntdWordCloudProps> {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd词云图",
            compKey: "AntdWordCloud",
            categorize: "chart",
            subCategorize: "wordCloud",
        };
    }

    getController(): ClazzTemplate<AntdWordCloudController> | null {
        return AntdWordCloudController
    }

    getMenuList(): MenuInfo[] {
        const menus = super.getMenuList();
        menus.splice(3, 0, {
            icon: Deeplink,
            name: '映射',
            key: 'mapping',
        })
        return menus;
    }

    getChartImg(): string {
        return baseWordCloudImg;
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuMapping = super.getMenuToConfigContentMap();
        menuMapping['style'] = AntdWordCloudStyle;
        menuMapping['mapping'] = AntdWordCloudFieldMapping;
        return menuMapping;
    }

    getInitConfig(): AntdWordCloudProps {
        const data = [
            {
                "value": 9,
                "name": "AntV"
            },
            {
                "value": 8,
                "name": "F2"
            },
            {
                "value": 8,
                "name": "G2"
            },
            {
                "value": 8,
                "name": "G6"
            },
            {
                "value": 8,
                "name": "DataSet"
            },
            {
                "value": 8,
                "name": "墨者学院"
            },
            {
                "value": 6,
                "name": "Analysis"
            },
            {
                "value": 6,
                "name": "Data Mining"
            },
            {
                "value": 6,
                "name": "Data Vis"
            },
            {
                "value": 6,
                "name": "Design"
            },
            {
                "value": 6,
                "name": "Grammar"
            },
            {
                "value": 6,
                "name": "Graphics"
            },
            {
                "value": 6,
                "name": "Graph"
            },
            {
                "value": 6,
                "name": "Hierarchy"
            },
            {
                "value": 6,
                "name": "Labeling"
            },
            {
                "value": 6,
                "name": "Layout"
            },
            {
                "value": 6,
                "name": "Quantitative"
            },
        ];
        return {
            base: {
                id: "",
                name: '基础面积图',
                type: 'AntdBaseWordCloud',
            },
            style: {
                data,
                wordField: 'name',
                weightField: 'value',
                colorField: 'name',
                supportCSSTransform: true,
                spiral: 'rectangular',
                wordStyle: {
                    fontFamily: '优设标题黑',
                    fontWeight: 500,
                    fontSize: [8, 32],
                    rotation: 0,
                    padding: 1,
                },
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
                staticData: data
            },
        };
    }
}

export default AntdWordCloudDefinition;
