import stackBarImg from "./stack-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBarController";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdStackBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠条形图",
            compKey: "AntdStackBar",
            categorize: "chart",
            subCategorize: "bar",
        };
    }

    getChartImg(): string {
        return stackBarImg;
    }

    getInitConfig(): AntdBarProps {
        const data = [
            {
                year: '1991',
                value: 300,
                type: 'Lon',
            },
            {
                year: '1992',
                value: 400,
                type: 'Lon',
            },
            {
                year: '1993',
                value: 350,
                type: 'Lon',
            },
            {
                year: '1991',
                value: 300,
                type: 'Bor',
            },
            {
                year: '1992',
                value: 400,
                type: 'Bor',
            },
            {
                year: '1993',
                value: 350,
                type: 'Bor',
            },
        ];
        return {
            base: {
                id: "",
                name: 'Antd堆叠条形图',
                type: 'AntdStackBar',
            },
            style: {
                data: data,
                xField: "value",
                yField: "year",
                seriesField: "type",
                isStack: true,
                maxBarWidth: 8,
                supportCSSTransform: true,
                color: ["#00c0df", "#298aff"],
                barStyle: {
                    radius: 0,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#b9b9b9ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#b9b9b980",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "right",
                    title: null,
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#b3b3b3ff",
                            fontSize: 10,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#00f0ffff",
                            fontSize: 12,
                        },
                    },
                },
                animation: {
                    appear: {
                        animation: "scale-in-x",
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

export default AntdStackBarDefinition;
