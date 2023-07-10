import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import antdTreemapImg from "./antd-treemap.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdTreeMapConfig = React.lazy(() => import("./AntdTreeMapConfig").then(module => ({default: module.AntdTreeMapConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdTreeMap = React.lazy(() => import("./AntdTreeMap"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

class AntdTreeMapCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "树矩阵",
            key: 'AntdTreeMap',
            typeName: "树矩阵",
            typeKey: "treemap",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return antdTreemapImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdTreeMap;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '雷达图',
                type: 'AntdRadar',
                des: '基于antd实现的雷达图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    data: {
                        name: 'root',
                        children: [
                            {
                                name: '分类 1',
                                value: 560,
                            },
                            {
                                name: '分类 2',
                                value: 500,
                            },
                            {
                                name: '分类 3',
                                value: 150,
                            },
                            {
                                name: '分类 4',
                                value: 140,
                            },
                            {
                                name: '分类 5',
                                value: 115,
                            },
                            {
                                name: '分类 6',
                                value: 95,
                            },
                            {
                                name: '分类 7',
                                value: 90,
                            },
                            {
                                name: '分类 8',
                                value: 75,
                            },
                            {
                                name: '分类 9',
                                value: 98,
                            },
                            {
                                name: '分类 10',
                                value: 60,
                            },
                            {
                                name: '分类 11',
                                value: 45,
                            },
                            {
                                name: '分类 12',
                                value: 40,
                            },
                            {
                                name: '分类 13',
                                value: 40,
                            },
                            {
                                name: '分类 14',
                                value: 35,
                            },
                            {
                                name: '分类 15',
                                value: 40,
                            },
                            {
                                name: '分类 16',
                                value: 40,
                            },
                            {
                                name: '分类 17',
                                value: 40,
                            },
                            {
                                name: '分类 18',
                                value: 30,
                            },
                            {
                                name: '分类 19',
                                value: 28,
                            },
                            {
                                name: '分类 20',
                                value: 16,
                            },
                        ],
                    },
                    colorField: 'name',
                    color: [
                        'rgba(0,181,255,0.67)',
                        'rgba(0,188,191,0.59)',
                        'rgba(75,235,252,0.84)',
                        'rgba(22,124,131,0.65)',
                        'rgba(74,229,232,0.44)',
                    ],
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
            'style': AntdTreeMapConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdTreeMapCore;