import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig, ThemeItemType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import barImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React, {ClassType} from "react";

const AntdBaseBar = React.lazy(() => import('./AntdBaseBar'));
const AntdBaseBarDataConfig = React.lazy(() => import('./AntdBaseBarDataConfig'));
const BaseInfo = React.lazy(() => import('../../../lib/common-fragment/base-info/BaseInfo'));
const ThemeConfig = React.lazy(() => import('../../../lib/common-fragment/theme-config/ThemeConfig'));
const AnimationConfig = React.lazy(() => import('../../../lib/common-fragment/animation-config/AnimationConfig'));
const AntdBaseBarConfigStyle = React.lazy(() => import('./AntdBaseBarConfigStyle'));


export const updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {
    if (!newTheme)
        return;
    const {colors: {main, text, supplementary, emphasize, background, auxiliary}} = newTheme;
    //边框
    if (sourceStyle?.style?.baseStyle?.border)
        sourceStyle.style.baseStyle.border = `2px solid ${emphasize}`;
    //背景
    if (sourceStyle?.style?.baseStyle?.backgroundColor)
        sourceStyle.style.baseStyle.backgroundColor = background;
    //图形
    if (sourceStyle?.style?.chartStyle?.color)
        sourceStyle.style.chartStyle.color = main;
    //图例
    if (sourceStyle?.style?.chartStyle?.legend?.itemName?.style?.fill)
        sourceStyle.style.chartStyle.legend.itemName.style.fill = text;
    //x轴-文本
    if (sourceStyle?.style?.chartStyle?.xAxis?.label?.style?.fill)
        sourceStyle.style.chartStyle.xAxis.label.style.fill = text;
    //x轴-标题
    if (sourceStyle?.style?.chartStyle?.xAxis?.title?.style?.fill)
        sourceStyle.style.chartStyle.xAxis.title.style.fill = text;
    //x轴-轴线
    if (sourceStyle?.style?.chartStyle?.xAxis?.line?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.line.style.stroke = emphasize;
    //x轴-网格线
    if (sourceStyle?.style?.chartStyle?.xAxis?.grid?.line?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.grid.line.style.stroke = auxiliary;
    //x轴-刻度线
    if (sourceStyle?.style?.chartStyle?.xAxis?.tickLine?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.tickLine.style.stroke = supplementary;
    //x轴-子刻度线
    if (sourceStyle?.style?.chartStyle?.xAxis?.subTickLine?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.subTickLine.style.stroke = auxiliary;
    //y轴-文本
    if (sourceStyle?.style?.chartStyle?.yAxis?.label?.style?.fill)
        sourceStyle.style.chartStyle.yAxis.label.style.fill = text;
    //y轴-标题
    if (sourceStyle?.style?.chartStyle?.yAxis?.title?.style?.fill)
        sourceStyle.style.chartStyle.yAxis.title.style.fill = text;
    //y轴-轴线
    if (sourceStyle?.style?.chartStyle?.yAxis?.line?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.line.style.stroke = emphasize;
    //y轴-网格线
    if (sourceStyle?.style?.chartStyle?.yAxis?.grid?.line?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.grid.line.style.stroke = auxiliary;
    //y轴-刻度线
    if (sourceStyle?.style?.chartStyle?.yAxis?.tickLine?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.tickLine.style.stroke = supplementary;
    //y轴-子刻度线
    if (sourceStyle?.style?.chartStyle?.yAxis?.subTickLine?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.subTickLine.style.stroke = auxiliary;
}

class AntdBaseBarCore extends AbstractCustomComponentDefinition {

    getKey(): string {
        return 'AntdBaseBar';
    }

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础条形图",
            key: 'AntdBaseBar',
            typeName: "条形图",
            typeKey: "bar",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return barImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseBar;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础条形图',
                type: 'AntdBaseBar',
                des: '基于antd实现的基础条形图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "#0f273db5",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    data: [
                        {
                            name: "1951 年",
                            value: 38
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 61
                        }
                    ],
                    xField: "value",
                    yField: "name",
                    seriesField: "name",
                    xAxis: {
                        grid: {
                            line: {
                                style: {
                                    stroke: "#00fffaff",
                                    lineWidth: 1
                                }
                            },
                            alignTick: true
                        },
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
                        position: "right",
                        title: {
                            text: "标题",
                            style: {
                                fill: "#00fff2ff"
                            },
                            position: "end"
                        }
                    },
                    yAxis: {
                        grid: {
                            line: {
                                style: {
                                    stroke: "#16a0b5ff",
                                    lineWidth: 2
                                }
                            },
                            alignTick: true
                        },
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
                        position: "bottom",
                        title: {
                            text: "y轴",
                            style: {
                                fill: "#00ddffff"
                            },
                            position: "start"
                        }
                    },
                    color: "#00FFEA33",
                    legend: {
                        position: "right-top",
                        layout: "vertical",
                        itemName: {
                            style: {
                                fill: "#00f0ffff",
                                fontSize: 12
                            }
                        }
                    },
                    maxBarWidth: 14,
                }
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {
                            name: "1951 年",
                            value: 38
                        },
                        {
                            name: "1952 年",
                            value: 52
                        },
                        {
                            name: "1956 年",
                            value: 61
                        }
                    ]
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

    getMenuToConfigContentMap(): { [key: string]: ClassType<any, any, any> } {
        return {
            'info': BaseInfo,
            'style': AntdBaseBarConfigStyle,
            'data': AntdBaseBarDataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseBarCore;