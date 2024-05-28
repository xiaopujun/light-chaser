import multiLineImg from "./multi-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLineController";
import {BaseInfoType, MenuToConfigMappingType} from "../../../framework/core/AbstractDefinition";
import AntdMultiLineStyleConfig, {AntdMultiLineFieldMapping} from "./AntdMultiLineConfig.tsx";

class AntdMultiLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd多折线图",
            compKey: "AntdMultiLine",
            categorize: "chart",
            subCategorize: "line",
        };
    }

    getChartImg(): string {
        return multiLineImg;
    }

    getMenuToConfigContentMap(): MenuToConfigMappingType {
        const menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdMultiLineStyleConfig;
        menuToConfigContentMap!['mapping'] = AntdMultiLineFieldMapping;
        return menuToConfigContentMap;
    }

    getInitConfig(): AntdLineProps {
        const data = [
            {
                year: "2007",
                value: 1706,
                category: "sort1",
            },
            {
                year: "2007",
                value: 448,
                category: "sort2",
            },
            {
                year: "2008",
                value: 1361,
                category: "sort1",
            },
            {
                year: "2008",
                value: 779,
                category: "sort2",
            },
            {
                year: "2009",
                value: 1722,
                category: "sort1",
            },
            {
                year: "2009",
                value: 430,
                category: "sort2",
            },
            {
                year: "2010",
                value: 1626,
                category: "sort1",
            },
            {
                year: "2010",
                value: 555,
                category: "sort2",
            },
        ]

        return {
            base: {
                id: "",
                name: '多折线图',
                type: 'AntdMultiLine',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                seriesField: "category",
                supportCSSTransform: true,
                color: ["#00a8ff", "#00ffc9"],
                point: {
                    color: ["#00a8ff", "#00ffc9"],
                    size: 3,
                    shape: "circle",
                    style: {
                        stroke: "#00a8ff",
                        lineWidth: 0
                    }
                },
                lineStyle: {
                    lineWidth: 2,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#969696ff",
                            fontSize: 11,
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
                            fill: "#a0a0a0ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#adadad75",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                smooth: false,
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#a0a0a0ff",
                            fontSize: 12,
                        },
                    },
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

export default AntdMultiLineDefinition;
