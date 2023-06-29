import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import antdScatterImg from "./antd-scatter.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseLineStyleConfig = React.lazy(() => import("./AntdScatterConfig").then(module => ({default: module.AntdScatterStyleConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdBubble = React.lazy(() => import("./AntdScatter"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

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
                            "size": 20,
                            "genre": "female"
                        },
                        {
                            "x": 6,
                            "y": 18,
                            "size": 1,
                            "genre": "female"
                        },
                        {
                            "x": 1,
                            "y": 93,
                            "size": 55,
                            "genre": "female"
                        },
                        {
                            "x": 57,
                            "y": 2,
                            "size": 90,
                            "genre": "female"
                        },
                        {
                            "x": 80,
                            "y": 76,
                            "size": 22,
                            "genre": "female"
                        },
                        {
                            "x": 11,
                            "y": 74,
                            "size": 96,
                            "genre": "female"
                        },
                        {
                            "x": 88,
                            "y": 56,
                            "size": 10,
                            "genre": "female"
                        },
                        {
                            "x": 30,
                            "y": 47,
                            "size": 49,
                            "genre": "female"
                        },
                        {
                            "x": 57,
                            "y": 62,
                            "size": 98,
                            "genre": "female"
                        },
                        {
                            "x": 4,
                            "y": 16,
                            "size": 16,
                            "genre": "female"
                        },
                        {
                            "x": 46,
                            "y": 10,
                            "size": 11,
                            "genre": "female"
                        },
                        {
                            "x": 22,
                            "y": 87,
                            "size": 89,
                            "genre": "female"
                        },
                        {
                            "x": 57,
                            "y": 91,
                            "size": 82,
                            "genre": "female"
                        },
                        {
                            "x": 45,
                            "y": 15,
                            "size": 98,
                            "genre": "female"
                        },
                        {
                            "x": 9,
                            "y": 81,
                            "size": 63,
                            "genre": "male"
                        },
                        {
                            "x": 98,
                            "y": 5,
                            "size": 89,
                            "genre": "male"
                        },
                        {
                            "x": 51,
                            "y": 50,
                            "size": 73,
                            "genre": "male"
                        },
                        {
                            "x": 41,
                            "y": 22,
                            "size": 14,
                            "genre": "male"
                        },
                        {
                            "x": 58,
                            "y": 24,
                            "size": 20,
                            "genre": "male"
                        },
                        {
                            "x": 78,
                            "y": 37,
                            "size": 34,
                            "genre": "male"
                        },
                        {
                            "x": 55,
                            "y": 56,
                            "size": 53,
                            "genre": "male"
                        },
                        {
                            "x": 18,
                            "y": 45,
                            "size": 70,
                            "genre": "male"
                        },
                        {
                            "x": 42,
                            "y": 44,
                            "size": 28,
                            "genre": "male"
                        },
                        {
                            "x": 3,
                            "y": 52,
                            "size": 59,
                            "genre": "male"
                        },
                        {
                            "x": 31,
                            "y": 18,
                            "size": 97,
                            "genre": "male"
                        },
                        {
                            "x": 79,
                            "y": 91,
                            "size": 63,
                            "genre": "male"
                        },
                        {
                            "x": 93,
                            "y": 23,
                            "size": 23,
                            "genre": "male"
                        },
                        {
                            "x": 44,
                            "y": 83,
                            "size": 22,
                            "genre": "male"
                        }
                    ],
                    xField: 'x',
                    yField: 'y',
                    colorField: 'genre',
                    color: ['rgba(0,198,255,0.67)', 'rgba(107,177,217,0.9)'],
                    sizeField: 'size',
                    size: [5, 20],
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
                            "size": 20,
                            "genre": "female"
                        },
                        {
                            "x": 6,
                            "y": 18,
                            "size": 1,
                            "genre": "female"
                        },
                        {
                            "x": 1,
                            "y": 93,
                            "size": 55,
                            "genre": "female"
                        },
                        {
                            "x": 57,
                            "y": 2,
                            "size": 90,
                            "genre": "female"
                        },
                        {
                            "x": 80,
                            "y": 76,
                            "size": 22,
                            "genre": "female"
                        },
                        {
                            "x": 11,
                            "y": 74,
                            "size": 96,
                            "genre": "female"
                        },
                        {
                            "x": 88,
                            "y": 56,
                            "size": 10,
                            "genre": "female"
                        },
                        {
                            "x": 30,
                            "y": 47,
                            "size": 49,
                            "genre": "female"
                        },
                        {
                            "x": 57,
                            "y": 62,
                            "size": 98,
                            "genre": "female"
                        },
                        {
                            "x": 4,
                            "y": 16,
                            "size": 16,
                            "genre": "female"
                        },
                        {
                            "x": 46,
                            "y": 10,
                            "size": 11,
                            "genre": "female"
                        },
                        {
                            "x": 22,
                            "y": 87,
                            "size": 89,
                            "genre": "female"
                        },
                        {
                            "x": 57,
                            "y": 91,
                            "size": 82,
                            "genre": "female"
                        },
                        {
                            "x": 45,
                            "y": 15,
                            "size": 98,
                            "genre": "female"
                        },
                        {
                            "x": 9,
                            "y": 81,
                            "size": 63,
                            "genre": "male"
                        },
                        {
                            "x": 98,
                            "y": 5,
                            "size": 89,
                            "genre": "male"
                        },
                        {
                            "x": 51,
                            "y": 50,
                            "size": 73,
                            "genre": "male"
                        },
                        {
                            "x": 41,
                            "y": 22,
                            "size": 14,
                            "genre": "male"
                        },
                        {
                            "x": 58,
                            "y": 24,
                            "size": 20,
                            "genre": "male"
                        },
                        {
                            "x": 78,
                            "y": 37,
                            "size": 34,
                            "genre": "male"
                        },
                        {
                            "x": 55,
                            "y": 56,
                            "size": 53,
                            "genre": "male"
                        },
                        {
                            "x": 18,
                            "y": 45,
                            "size": 70,
                            "genre": "male"
                        },
                        {
                            "x": 42,
                            "y": 44,
                            "size": 28,
                            "genre": "male"
                        },
                        {
                            "x": 3,
                            "y": 52,
                            "size": 59,
                            "genre": "male"
                        },
                        {
                            "x": 31,
                            "y": 18,
                            "size": 97,
                            "genre": "male"
                        },
                        {
                            "x": 79,
                            "y": 91,
                            "size": 63,
                            "genre": "male"
                        },
                        {
                            "x": 93,
                            "y": 23,
                            "size": 23,
                            "genre": "male"
                        },
                        {
                            "x": 44,
                            "y": 83,
                            "size": 22,
                            "genre": "male"
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
            'style': AntdBaseLineStyleConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseColumnCore;