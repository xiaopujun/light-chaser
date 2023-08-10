import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import stackBarImg from "./stack-bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ConfigType} from "../../../designer/right/ConfigType";
import AntdStackBar, {AntdStackBarProps} from "./AntdStackBar";
import {ClazzTemplate} from "../../common-component/common-types";

export interface AntdBaseBarMenuMapping {
    info: React.ComponentType<ConfigType>;
    style: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}


const AntdStackBarStyleConfig = React.lazy(() => import("./AntdStackBarConfig").then((module) => ({default: module.AntdStackBarStyleConfig,})));
const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));


class AntdStackBarDefinition extends AbstractCustomComponentDefinition<AntdStackBar, AntdBaseBarMenuMapping, AntdStackBarProps> {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠条形图",
            compKey: "AntdStackBar",
            type: "条形图",
            typeKey: "bar",
            desc: "基于Antd Designer实现的堆叠条形图组件",
        };
    }

    getChartImg(): string {
        return stackBarImg;
    }

    getComponent(): ClazzTemplate<AntdStackBar> | null {
        return AntdStackBar;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): AntdBaseBarMenuMapping | null {
        return {
            info: BaseInfo,
            style: AntdStackBarStyleConfig,
            data: DataConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    getInitConfig(): AntdStackBarProps {
        const data = [
            {
                year: '1991',
                value: 3,
                type: 'Lon',
            },
            {
                year: '1992',
                value: 4,
                type: 'Lon',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Lon',
            },
            {
                year: '1991',
                value: 3,
                type: 'Bor',
            },
            {
                year: '1992',
                value: 4,
                type: 'Bor',
            },
            {
                year: '1993',
                value: 3.5,
                type: 'Bor',
            },
        ];
        return {
            info: {
                id: "",
                name: 'Antd堆叠条形图',
                type: 'AntdStackBar',
                desc: '基于Antd Designer实现的堆叠条形图组件',
            },
            style: {
                data: data,
                xField: 'value',
                yField: 'year',
                seriesField: 'type',
                isStack: true,
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
                // color: ['#00d7ff', '#0080b6'],
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

export default AntdStackBarDefinition;
