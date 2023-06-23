import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseLineImg from "./base-line.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseLineStyleConfig = React.lazy(() => import("./AntdBaseLineConfig").then(module => ({default: module.AntdBaseLineStyleConfig})));
const AnimationConfig = React.lazy(() => import("../../../lib/common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../../lib/common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../../lib/common-fragment/base-info/BaseInfo"));
const AntdBaseLine = React.lazy(() => import("./AntdBaseLine"));
const DataConfig = React.lazy(() => import("../../../lib/common-fragment/data-config/DataConfig"));

class AntdBaseColumnCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础折线图",
            key: 'AntdBaseLine',
            typeName: "折线图",
            typeKey: "line",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return baseLineImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseLine;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础折线图',
                type: 'AntdBaseLine',
                des: '基于antd实现的基础折线图',
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
                        {name: "1951 年", value: 45},
                        {name: "1952 年", value: 152},
                        {name: "1956 年", value: 61},
                        {name: "1957 年", value: 278},
                        {name: "1958 年", value: 100},
                        {name: "1959 年", value: 430},
                    ],
                    xField: "name",
                    yField: "value",
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
                    smooth: true,
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: [
                        {name: "1951 年", value: 45},
                        {name: "1952 年", value: 152},
                        {name: "1956 年", value: 61},
                        {name: "1957 年", value: 278},
                        {name: "1958 年", value: 100},
                        {name: "1959 年", value: 430},
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