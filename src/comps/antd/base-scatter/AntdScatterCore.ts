import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import antdScatterImg from "./antd-scatter.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseLineStyleConfig = React.lazy(() => import("./AntdScatterConfig").then(module => ({default: module.AntdScatterStyleConfig})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const AntdBubble = React.lazy(() => import("./AntdScatter"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));

class AntdBaseColumnCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "散点图",
            key: 'AntdScatter',
            typeName: "散点图",
            typeKey: "scatter",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return antdScatterImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBubble;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '散点图',
                type: 'AntdScatter',
                des: '基于antd实现的散点图',
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
                            "x": 42,
                            "y": 38,
                        },
                        {
                            "x": 6,
                            "y": 18,
                        },
                        {
                            "x": 26,
                            "y": 93,
                        },
                    ],
                    xField: 'x',
                    yField: 'y',
                    color: '#00ebff',
                    size: 10,
                    shape: 'circle',
                    xAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: {
                            style: {
                                stroke: "#00ffbbff",
                                lineWidth: 1
                            }
                        },
                        tickLine: {
                            style: {
                                stroke: "#00baffff",
                                lineWidth: 2
                            },
                            alignTick: true,
                            length: 3
                        },
                        subTickLine: {
                            style: {
                                stroke: "#1a98b5ff",
                                lineWidth: 3
                            },
                            count: 5,
                            length: 3
                        },
                        position: "bottom",
                        title: null
                    },
                    yAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: "#00FFEAFF"
                            }
                        },
                        line: {
                            style: {
                                stroke: "#00dbffff",
                                lineWidth: 1
                            }
                        },
                        tickLine: {
                            style: {
                                stroke: "#21f2f5ff",
                                lineWidth: 2
                            },
                            alignTick: true,
                            length: 3
                        },
                        subTickLine: {
                            style: {
                                stroke: "#03b7a3ff",
                                lineWidth: 3
                            },
                            count: 5,
                            length: 2
                        },
                        position: "left",
                        title: null
                    },
                    legend: {
                        position: "top",
                        layout: "horizontal",
                        itemName: {
                            style: {
                                fill: "#00f0ffff",
                                fontSize: 12
                            }
                        }
                    },
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {
                            "x": 42,
                            "y": 38,
                        },
                        {
                            "x": 6,
                            "y": 18,
                        },
                        {
                            "x": 26,
                            "y": 93,
                        },
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
            'style': AntdBaseLineStyleConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseColumnCore;