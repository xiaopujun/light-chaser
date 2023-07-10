import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import antdVennImg from "./antd-venn.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdVennConfig = React.lazy(() => import("./AntdVennConfig").then(module => ({default: module.AntdVennConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdVenn = React.lazy(() => import("./AntdVenn"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

class AntdVennCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "韦恩图",
            key: 'AntdVenn',
            typeName: "韦恩图",
            typeKey: "venn",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return antdVennImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdVenn;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '韦恩图',
                type: 'AntdVenn',
                des: '基于antd实现的韦恩图',
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
                            sets: ['A'],
                            size: 12,
                            label: 'A',
                        },
                        {
                            sets: ['B'],
                            size: 12,
                            label: 'B',
                        },
                        {
                            sets: ['C'],
                            size: 12,
                            label: 'C',
                        },
                        {
                            sets: ['A', 'B'],
                            size: 2,
                            label: 'A&B',
                        },
                        {
                            sets: ['A', 'C'],
                            size: 2,
                            label: 'A&C',
                        },
                        {
                            sets: ['B', 'C'],
                            size: 2,
                            label: 'B&C',
                        },
                        {
                            sets: ['A', 'B', 'C'],
                            size: 1,
                        },
                    ],
                    setsField: 'sets',
                    sizeField: 'size',
                    pointStyle: {
                        fillOpacity: 0.85,
                    },
                    legend: false
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
            'style': AntdVennConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdVennCore;