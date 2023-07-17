import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseGaugeImg from "./base-gauge.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseGaugeStyleConfig = React.lazy(() => import("./AntdBaseGaugeConfig").then(module => ({default: module.AntdBaseGaugeStyleConfig})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const AntdBaseGauge = React.lazy(() => import("./AntdBaseGauge"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));

class AntdBaseGaugeCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础仪表盘",
            key: 'AntdBaseGauge',
            typeName: "进度图",
            typeKey: "progress",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return baseGaugeImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseGauge;
    }

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础仪表盘',
                type: 'AntdBaseGauge',
                des: '基于antd实现的基础仪表盘',
            },
            style: {
                baseStyle: {
                    padding: "10px",
                    backgroundColor: "rgba(14,16,20,0.11)",
                    border: "2px solid #00deffff",
                    borderRadius: "3px"
                },
                chartStyle: {
                    percent: 0.75,
                    radius: 0.9,
                    range: {
                        color: '#30BF78',
                        width: 12,
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
                    gaugeStyle: {
                        lineCap: 'round',
                    },
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: 0.75,
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
            'style': AntdBaseGaugeStyleConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseGaugeCore;