import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ElemConfig} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseLiquidImg from "./base-liquid.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import React from "react";
import {updateTheme} from "../../common-fragment/ThemeFragment";

const AntdBaseLiquidConfig = React.lazy(() => import("./AntdBaseLiquidConfig").then(module => ({default: module.AntdBaseLiquidConfig})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const AntdBaseLiquid = React.lazy(() => import("./AntdBaseLiquid"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));

class AntdBaseLiquidCore extends AbstractCustomComponentDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            name: "基础水波图",
            key: 'AntdBaseLiquid',
            typeName: "进度图",
            typeKey: "progress",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return baseLiquidImg;
    }

    getComponent(): React.Component | React.FC | any {
        return AntdBaseLiquid;
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
                    percent: 0.25,
                    outline: {
                        border: 4,
                        style: {
                            stroke: '#00d3ff',
                        }
                    },
                    wave: {
                        length: 128,
                    },
                    statistic: {
                        content: {
                            style: {
                                color: '#00baff',
                                fontSize: 20,
                            }
                        }
                    }
                },
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: 0.25,
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
            'style': AntdBaseLiquidConfig,
            'data': DataConfig,
            'animation': AnimationConfig,
            'theme': ThemeConfig
        };
    }

    updateTheme = updateTheme;
}

export default AntdBaseLiquidCore;