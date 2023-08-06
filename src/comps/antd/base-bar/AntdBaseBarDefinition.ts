import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import previewImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import AntdBaseBar, {AntdBarProps} from "./AntdBaseBar";
import {ConfigType} from "../../../designer/right/ConfigType";
import {BarOptions, Options} from "@antv/g2plot";

export interface AntdBaseBarMenuMapping {
    info: React.ComponentType<ConfigType>;
    style: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}

export type WritableBarOptions = {
    -readonly [K in keyof BarOptions]?: BarOptions[K];
};
export type WritableOptions = {
    -readonly [K in keyof Options]?: Options[K];
};

export type ClazzTemplate<C> = new () => C | null;

const AntdBaseBarStyleConfig = React.lazy(() => import("./AntdBaseBarConfig").then((module) => ({default: module.AntdBaseBarStyleConfig,})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));


class AntdBaseBarDefinition extends AbstractCustomComponentDefinition<AntdBaseBar, AntdBaseBarMenuMapping, AntdBarProps> {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd条形图",
            compKey: "AntdBaseBar",
            type: "条形图",
            typeKey: "bar",
            desc: "基于Antd Designer实现的条形图组件",
        };
    }

    getChartImg(): string {
        return previewImg;
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
                name: '基础条形图',
                type: 'AntdBaseBar',
                desc: '基于antd实现的基础条形图',
            },
            style: {
                data: data,
                xField: "value",
                yField: "name",
                seriesField: "name",
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
                    title: null
                },
                color: "#00ffea",
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
