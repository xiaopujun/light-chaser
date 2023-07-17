import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import antdWordCloudImg from "./antd-wordcloud.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdWordCloudConfig = React.lazy(() => import("./AntdWordCloudConfig").then(module => ({default: module.AntdWordCloudConfig})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const AntdWordCloud = React.lazy(() => import("./AntdWordCloud"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));

class AntdWordCloudCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "词云图",
            key: 'AntdWordCloud',
            typeName: "词云图",
            typeKey: "venn",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return antdWordCloudImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdWordCloud;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '词云图',
                type: 'AntdWordCloud',
                des: '基于antd实现的词云图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    data: [
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
                        {
                            "value": 6,
                            "name": "Relation"
                        },
                        {
                            "value": 6,
                            "name": "Statistics"
                        },
                    ],
                    wordField: 'name',
                    weightField: 'value',
                    colorField: 'name',
                    wordStyle: {
                        fontFamily: 'Verdana',
                        fontSize: [8, 32],
                        rotation: 0,
                    },
                    random: () => 0.5,
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {
                            name: "1951 年",
                            value: 48
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 22
                        }
                    ],
                },
            },
            animation: {},
            theme: {
                themeId: '',
            },
        };
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any } {
        return {
            'info': BaseInfo,
            'style': AntdWordCloudConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdWordCloudCore;