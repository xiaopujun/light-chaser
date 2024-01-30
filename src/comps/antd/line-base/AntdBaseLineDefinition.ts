import baseLineImg from "./base-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import React from "react";

const AntdBaseLineStyleConfig = React.lazy(() => import("./AntdBaseLineConfig").then((module) => ({default: module.AntdBaseLineStyleConfig})));

class AntdBaseLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础折线图",
            compKey: "AntdBaseLine",
            categorize: "chart",
            subCategorize: "line",
        };
    }

    getChartImg(): string {
        return baseLineImg;
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType | null {
        const menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdBaseLineStyleConfig;
        return menuToConfigContentMap;
    }

    getInitConfig(): AntdLineProps {
        const data = [
            {"name": "1990", "value": 525},
            {"name": "1991", "value": 459},
            {"name": "1992", "value": 357},
            {"name": "1993", "value": 414},
            {"name": "1994", "value": 234},
            {"name": "1995", "value": 250},
            {"name": "1996", "value": 156}];
        return {
            base: {
                id: "",
                name: '基础折线图',
                type: 'AntdBaseLine',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
                smooth: false,
                supportCSSTransform: true,
                color: "#00d7ff",
                lineStyle: {
                    stroke: undefined,
                    lineWidth: 2,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#969696ff",
                            fontSize: 10,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "left",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#b1b1b1ff",
                            fontSize: 9,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9e9e9e7d",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                point: {
                    size: 4,
                    style: {
                        fill: "#00d7ff",
                    }
                },
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

export default AntdBaseLineDefinition;
