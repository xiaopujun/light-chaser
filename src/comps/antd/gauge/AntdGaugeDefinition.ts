import React from "react";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {BaseMenuMapping, ClazzTemplate} from "../../common-component/common-types";
import AntdGaugeController, {AntdGaugeProps} from "./AntdGaugeController";
import gaugeImg from './gauge.png';
import {BaseInfoType} from "../../../designer/DesignerType";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdGaugeConfig = React.lazy(() => import("./AntdGaugeConfig").then((module) => ({default: module.AntdGaugeConfig})));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


class AntdGaugeDefinition /*extends AbstractDefinition<AntdGauge, BaseMenuMapping, AntdGaugeProps>*/ {

    getComponent(): ClazzTemplate<AntdGaugeController> | null {
        return AntdGaugeController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): BaseMenuMapping | null {
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
            type: "仪表盘",
            typeKey: "gauge",
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
                range: {
                    color: '#30BF78',
                },
                indicator: {
                    pointer: {
                        style: {
                            stroke: '#D0D0D0',
                        },
                    },
                    pin: {
                        style: {
                            stroke: '#D0D0D0',
                        },
                    },
                },
                axis: {
                    label: {
                        formatter(v) {
                            return Number(v) * 100;
                        },
                    },
                    subTickLine: {
                        count: 3,
                    },
                },
                statistic: {
                    content: {
                        formatter: ({percent}: any) => `Rate: ${(percent * 100).toFixed(0)}%`,
                        style: {
                            color: 'rgba(0,0,0,0.65)',
                            fontSize: '16px',
                        },
                    },
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: []
                },
            },
        };
    }
}

export default AntdGaugeDefinition;
