import baseAreaImg from "./base-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonAreaController";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import React from "react";

const AntdBaseAreaStyleConfig = React.lazy(() => import("./AntdBaseAreaConfig").then((module) => ({default: module.AntdBaseAreaStyleConfig})));
const AntdBaseAreaFieldMapping = React.lazy(() => import("./AntdBaseAreaConfig").then((module) => ({default: module.AntdBaseAreaFieldMapping})));

class AntdBaseAreaDefinition extends AbstractAreaDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础面积图",
            compKey: "AntdBaseArea",
            categorize: "chart",
            subCategorize: "area"
        };
    }

    getChartImg(): string {
        return baseAreaImg;
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdBaseAreaStyleConfig;
        menuToConfigContentMap!['mapping'] = AntdBaseAreaFieldMapping;
        return menuToConfigContentMap;
    }

    getInitConfig(): AntdAreaProps {
        const data = [
            {"name": "Q1", "value": 140},
            {"name": "Q2", "value": 205},
            {"name": "Q3", "value": 186},
            {"name": "Q4", "value": 220}
        ];
        return {
            base: {
                id: "",
                name: '基础面积图',
                type: 'AntdBaseArea',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
                smooth: false,
                supportCSSTransform: true,
                isStack: false,
                startOnZero: false,
                point: {
                    size: 4,
                    style: {
                        fill: "#00ddffff",
                        stroke: "#ffffff",
                        lineWidth: 0
                    }
                },
                line: {
                    size: 0
                },
                areaStyle: {
                    fillOpacity: 1,
                    fill: "#00DAFF72"
                },
                xAxis: {
                    range: [0, 1],
                    grid: null,
                    label: {
                        style: {
                            fill: "#adadadff",
                            fontSize: 10
                        }
                    },
                    line: {
                        style: {
                            stroke: "#c7c7c76e",
                            lineWidth: 1
                        }
                    },
                    tickLine: null,
                    subTickLine: null,
                    title: null,
                    position: "bottom"
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#9a9a9aff",
                            fontSize: 10
                        }
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    title: null
                },
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
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000
                    }
                }
            },
            filter: {
                enable: false,
                blur: 0,
                brightness: 1,
                contrast: 1,
                opacity: 1,
                saturate: 1,
                hueRotate: 0
            },
            data: {
                sourceType: 'static',
                staticData: data
            },
        };
    }
}

export default AntdBaseAreaDefinition;
