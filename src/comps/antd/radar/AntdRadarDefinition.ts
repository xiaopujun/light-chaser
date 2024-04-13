import React from "react";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import {MenuInfo} from "../../../designer/right/MenuType";
import {getDefaultMenuList} from "../../../designer/right/util";
import {ClazzTemplate} from "../../common-component/common-types";
import radarImg from './radar.png';
import AntdRadarController, {AntdRadarProps} from "./AntdRadarController.ts";
import {AntdCommonDefinition} from "../../antd-common/AntdCommonDefinition";

const AnimationConfig = React.lazy(() => import("../../common-component/animation-config/AnimationConfig"));
const AntdRadarStyleConfig = React.lazy(() => import("./AntdRadarStyleConfig.tsx"));
const ThemeConfig = React.lazy(() => import("../../common-component/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-component/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-component/data-config/DataConfig"));
const AntdRadarFieldMapping = React.lazy(() => import("./AntdRadarStyleConfig.tsx").then((module) => ({default: module.AntdRadarFieldMapping})));

class AntdRadarDefinition extends AntdCommonDefinition<AntdRadarController, AntdRadarProps> {

    getController(): ClazzTemplate<AntdRadarController> | null {
        return AntdRadarController;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        return {
            base: BaseInfo,
            data: DataConfig,
            style: AntdRadarStyleConfig,
            animation: AnimationConfig,
            theme: ThemeConfig,
            mapping: AntdRadarFieldMapping
        };
    }

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd雷达图",
            compKey: "AntdRadar",
            categorize: "chart",
            subCategorize: "radar",
        };
    }

    getChartImg(): string | null {
        return radarImg;
    }

    getInitConfig(): AntdRadarProps {
        const data = [
            {
                name: "G2",
                star: 10371
            },
            {
                name: "G6",
                star: 7380
            },
            {
                name: "F2",
                star: 7414
            },
            {
                name: "L7",
                star: 2140
            },
            {
                name: "X6",
                star: 6601
            },
            {
                name: "AVA",
                star: 8851
            },
            {
                name: "G2Plot",
                star: 1626
            }
        ];
        return {
            base: {
                id: "",
                name: 'Antd雷达图',
                type: 'AntdRadar',
            },
            style: {
                data: data,
                xField: "name",
                yField: "star",
                radius: 1,
                smooth: true,
                lineStyle: {
                    stroke: "#8fe0ff",
                    lineWidth: 2,
                    opacity: 0.5
                },
                point: {
                    size: 3,
                    shape: "circle",
                    style: {
                        fill: "#4c9cff",
                        stroke: "#64d6ff",
                        lineWidth: 1
                    }
                },
                area: {
                    style: {
                        fill: "#3991ff",
                        fillOpacity: 0.6
                    }
                },
                xAxis: {
                    line: null,
                    tickLine: null,
                    grid: {
                        alignTick: true,
                        line: {
                            style: {
                                stroke: "#42cdffbb",
                                lineWidth: 1
                            },
                            type: "line"
                        }
                    },
                    label: {
                        style: {
                            fill: "#41bbff"
                        }
                    }
                },
                yAxis: {
                    line: {
                        style: {
                            stroke: "#595959",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    grid: {
                        alignTick: true,
                        line: {
                            style: {
                                stroke: "#7ee5ff95",
                                lineWidth: 1
                            },
                            type: "line"
                        }
                    },
                    label: {
                        style: {
                            fill: "#78b3fa"
                        }
                    }
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdRadarDefinition;
