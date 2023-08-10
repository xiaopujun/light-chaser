import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import baseBarImg from "./base-bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import AntdBaseBar from "./AntdBaseBar";
import {ConfigType} from "../../../designer/right/ConfigType";
import {ClazzTemplate} from "../../common-component/common-types";
import {AntdBarProps} from "../../antd-common/AntdCommonBar";

export interface AntdBaseBarMenuMapping {
    info: React.ComponentType<ConfigType>;
    style: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}

const AntdBaseBarStyleConfig = React.lazy(() => import("./AntdBaseBarConfig").then((module) => ({default: module.AntdBaseBarStyleConfig,})));
const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


class AntdBaseBarDefinition extends AbstractCustomComponentDefinition<AntdBaseBar, AntdBaseBarMenuMapping, AntdBarProps> {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础条形图",
            compKey: "AntdBaseBar",
            type: "条形图",
            typeKey: "bar",
            desc: "基于Antd Designer实现的基础条形图组件",
        };
    }

    getChartImg(): string {
        return baseBarImg;
    }

    getComponent(): ClazzTemplate<AntdBaseBar> | null {
        return AntdBaseBar;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): AntdBaseBarMenuMapping | null {
        return {
            info: BaseInfo,
            style: AntdBaseBarStyleConfig,
            data: DataConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    getInitConfig(): AntdBarProps {
        const data = [
            {
                name: "1951 年",
                value: 48
            },
            {
                name: "1952 年",
                value: 52
            },
            {
                name: "1956 年",
                value: 22
            }
        ]
        return {
            info: {
                id: "",
                name: '基础条形图',
                type: 'AntdBaseBar',
                desc: '基于antd实现的基础条形图',
            },
            style: {
                data: data,
                xField: "value",
                yField: "name",
                xAxis: {
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
                    tickLine: null,
                    subTickLine: null,
                    position: "right",
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
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null
                },
                barStyle: {
                    fill: 'l(0) 0:#00000000 1:#00d7ff',
                },
                // color: '#00d7ff',
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
                maxBarWidth: 8,
                supportCSSTransform: true,
            },
            data: {
                dataSource: 'static',
                staticData: {
                    data: data
                },
            },
        };
    }
}

export default AntdBaseBarDefinition;
