import percentAreaImg from "./percent-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonAreaController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdPercentAreaDefinition extends AbstractAreaDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd百分比面积图",
            compKey: "AntdPercentArea",
            categorize: "chart",
            subCategorize: "area",
        };
    }

    getChartImg(): string {
        return percentAreaImg;
    }

    getInitConfig(): AntdAreaProps {
        const data = [
            {
                "country": "Asia",
                "year": "1750",
                "value": 502
            },
            {
                "country": "Asia",
                "year": "1800",
                "value": 635
            },
            {
                "country": "Asia",
                "year": "1850",
                "value": 809
            },
            {
                "country": "Asia",
                "year": "1900",
                "value": 947
            },
            {
                "country": "Asia",
                "year": "1950",
                "value": 1402
            },
            {
                "country": "Asia",
                "year": "1999",
                "value": 3634
            },
            {
                "country": "Asia",
                "year": "2050",
                "value": 5268
            },
            {
                "country": "Africa",
                "year": "1750",
                "value": 106
            },
            {
                "country": "Africa",
                "year": "1800",
                "value": 107
            },
            {
                "country": "Africa",
                "year": "1850",
                "value": 111
            },
            {
                "country": "Africa",
                "year": "1900",
                "value": 133
            },
            {
                "country": "Africa",
                "year": "1950",
                "value": 221
            },
            {
                "country": "Africa",
                "year": "1999",
                "value": 767
            },
            {
                "country": "Africa",
                "year": "2050",
                "value": 1766
            },
            {
                "country": "Europe",
                "year": "1750",
                "value": 163
            },
            {
                "country": "Europe",
                "year": "1800",
                "value": 203
            },
            {
                "country": "Europe",
                "year": "1850",
                "value": 276
            },
            {
                "country": "Europe",
                "year": "1900",
                "value": 408
            },
            {
                "country": "Europe",
                "year": "1950",
                "value": 547
            },
            {
                "country": "Europe",
                "year": "1999",
                "value": 729
            },
            {
                "country": "Europe",
                "year": "2050",
                "value": 628
            }
        ];
        return {
            base: {
                id: "",
                name: '百分比面积图',
                type: 'AntdPercentArea',
            },
            style: {
                data: data,
                xField: "year",
                yField: "value",
                seriesField: "country",
                isPercent: true,
                xAxis: {
                    position: "bottom",
                    range: [0, 1],
                    grid: null,
                    label: {
                        style: {
                            fill: "#aaaaaaff",
                            fontSize: 8,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    title: null,
                },
                yAxis: {
                    position: "left",
                    grid: null,
                    label: {
                        style: {
                            fill: "#afafafff",
                            fontSize: 8,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#545454c7",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    title: null,
                },
                smooth: true,
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#b1b1b1ff",
                            fontSize: 12,
                        },
                    },
                },
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                line: {
                    style: {
                        lineWidth: 0,
                    },
                },
                color: ["#4fa3ffff", "#009affff", "#006d7fff"],
                areaStyle: {},
                point: {
                    size: 3,
                    style: {
                        fill: "#78edffad",
                    },
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

export default AntdPercentAreaDefinition;
