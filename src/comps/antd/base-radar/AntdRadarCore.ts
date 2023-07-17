import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import antdRadarImg from "./base-radar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdRadarConfig = React.lazy(() => import("./AntdRadarConfig").then(module => ({default: module.AntdRadarConfig})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const AntdRadar = React.lazy(() => import("./AntdRadar"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));

class AntdRadarCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "雷达图",
            key: 'AntdRadar',
            typeName: "雷达图",
            typeKey: "radar",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return antdRadarImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdRadar;
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
                    data: [
                        {
                            name: 'G2',
                            star: 10371,
                        },
                        {
                            name: 'G6',
                            star: 7380,
                        },
                        {
                            name: 'F2',
                            star: 7414,
                        },
                        {
                            name: 'L7',
                            star: 2140,
                        },
                        {
                            name: 'X6',
                            star: 660,
                        },
                        {
                            name: 'AVA',
                            star: 885,
                        },
                        {
                            name: 'G2Plot',
                            star: 1626,
                        },
                    ].map((d) => ({...d, star: Math.sqrt(d.star)})),
                    xField: 'name',
                    yField: 'star',
                    appendPadding: [0, 10, 0, 10],
                    meta: {
                        star: {
                            alias: 'star 数量',
                            min: 0,
                            // nice: true,
                            formatter: (v: number) => Number(v).toFixed(2),
                        },
                    },
                    xAxis: {
                        grid: {
                            line: {
                                type: 'line',
                                style: {
                                    stroke: "#00FFEAFF"
                                },
                            },
                        },
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        title: null
                    },
                    yAxis: {
                        grid: {
                            line: {
                                type: 'line',
                                style: {
                                    stroke: "#00FFEAFF"
                                },
                            },
                        },
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        title: null
                    },
                    // 开启辅助点
                    point: {
                        size: 2,
                    },
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
            'style': AntdRadarConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdRadarCore;