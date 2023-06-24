import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import columnImg from "./column.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseColumnConfigStyle = React.lazy(() => import("./AntdBaseColumnConfig").then(module => ({default: module.AntdBaseColumnStyleConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdBaseColumn = React.lazy(() => import("./AntdBaseColumn"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

class AntdBaseColumnCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础柱状图",
            key: 'AntdBaseColumn',
            typeName: "柱状图",
            typeKey: "column",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return columnImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseColumn;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础柱状图',
                type: 'AntdBaseColumn',
                des: '基于antd实现的基础柱状图',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "#0e1014",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    data: [
                        {
                            name: "1951 年",
                            value: 45
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
                    xField: "name",
                    yField: "value",
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
                        position: "bottom",
                        title: null
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
                        position: "left",
                        title: null
                    },
                    color: "#00ffe6",
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
                    maxColumnWidth: 14,
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

    getMenuToConfigContentMap(): { [key: string]: React.Component | React.FC | any } {
        return {
            'info': BaseInfo,
            'style': AntdBaseColumnConfigStyle,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseColumnCore;