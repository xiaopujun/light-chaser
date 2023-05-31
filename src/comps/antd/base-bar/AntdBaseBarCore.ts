import {AbstractAutoScannerCore, BaseInfoType} from "../../../framework/abstract/AbstractAutoScannerCore";
import {ElemConfig} from "../../../framework/types/DesignerType";
import {MenuInfo} from "../../../framework/types/MenuType";
import barImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React, {ClassType} from "react";
import AntdBaseBarConfigStyle from "./AntdBaseBarConfigStyle";
import AnimationConfig from "../../../lib/common-fragment/animation-config/AnimationConfig";
import ThemeConfig from "../../../lib/common-fragment/theme-config/ThemeConfig";
import BaseInfo from "../../../lib/common-fragment/base-info/BaseInfo";
import AntdBaseBar from "./AntdBaseBar";
import AntdBaseBarDataConfig from "./AntdBaseBarDataConfig";

class AntdBaseBarCore extends AbstractAutoScannerCore {

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
                    maxBarWidth: 14
                }
            },
            data: {
                sourceType: 'static',
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
            theme: {},
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
}

export default AntdBaseBarCore;