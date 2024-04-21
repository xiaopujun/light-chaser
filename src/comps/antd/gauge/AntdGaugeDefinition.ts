import React from "react";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import AntdGaugeController, {AntdGaugeProps} from "./AntdGaugeController";
import gaugeImg from './gauge.png';
import {AbstractDefinition, BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdGaugeConfig = React.lazy(() => import("./AntdGaugeConfig"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


class AntdGaugeDefinition extends AbstractDefinition<AntdGaugeController, AntdGaugeProps> {
    getController(): ClazzTemplate<AntdGaugeController> | null {
        return AntdGaugeController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList().filter((menu) => menu.key !== 'mapping');
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdGaugeConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd仪表盘",
            compKey: "AntdGauge",
            categorize: "chart",
            subCategorize: "progress",
        };
    }

    getChartImg(): string | null {
        return gaugeImg;
    }

    getInitConfig(): AntdGaugeProps {
        return {
            base: {
                id: "",
                name: 'Antd仪表盘',
                type: 'AntdGauge',
            },
            style: {
                percent: 0.75,
                radius: 0.75,
                innerRadius: 0.95,
                startAngle: (-7 / 6) * Math.PI,
                endAngle: (1 / 6) * Math.PI,
                range: {
                    color: ["#6bc2ff", "#5d9eff59"]
                },
                indicator: {
                    pointer: {
                        style: {
                            stroke: "#37b3ff",
                            lineWidth: 2
                        }
                    },
                    pin: {
                        style: {
                            stroke: "#37b3ff",
                            fill: "#053b5d",
                            r: 2,
                            lineWidth: 2
                        }
                    }
                },
                axis: {
                    tickLine: {
                        style: {
                            stroke: "#89d2ff",
                            lineWidth: 1
                        },
                        length: -4
                    },
                    subTickLine: {
                        count: 11,
                        style: {
                            stroke: "#2caaff",
                            lineWidth: 1
                        },
                        length: -2
                    },
                    label: {
                        style: {
                            fill: "#69c6ff",
                            fontSize: 12,
                            textAlign: "center",
                            textBaseline: "middle"
                        }
                    }
                },
                statistic: {
                    content: {
                        style: {
                            color: "#49c1ff",
                            fontSize: '11px'
                        }
                    }
                },
                animation: {
                    appear: {
                        animation: "grow-in-x",
                        duration: 3000
                    },
                    update: {
                        animation: 'grow-in-x',
                        duration: 3000
                    }
                },
            },
            data: {
                sourceType: 'static',
                staticData: 0.75
            },
        };
    }
}

export default AntdGaugeDefinition;
