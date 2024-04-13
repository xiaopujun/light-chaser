import groupBarImg from "./group-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBarController";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdGroupBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd分组条形图",
            compKey: "AntdGroupBar",
            categorize: "chart",
            subCategorize: "bar",
        };
    }

    getChartImg(): string {
        return groupBarImg;
    }

    getInitConfig(): AntdBarProps {
        const data = [
            {
                label: 'Mon.',
                type: 'series1',
                value: 2800,
            },
            {
                label: 'Mon.',
                type: 'series2',
                value: 2260,
            },
            {
                label: 'Tues.',
                type: 'series1',
                value: 1800,
            },
            {
                label: 'Tues.',
                type: 'series2',
                value: 1300,
            },
            {
                label: 'Wed.',
                type: 'series1',
                value: 950,
            },
            {
                label: 'Wed.',
                type: 'series2',
                value: 900,
            }
        ];
        return {
            base: {
                id: "",
                name: "Antd分组条形图",
                type: "AntdGroupBar",
            },
            style: {
                data: data,
                isGroup: true,
                xField: "value",
                yField: "label",
                seriesField: "type",
                color: ["#00a6ffff", "#5dd1ffff"],
                barStyle: {},
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#929292ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#a2a2a273",
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
                            fill: "#9c9c9cff",
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
                            fill: "#adadadff",
                            fontSize: 12,
                        },
                    },
                },
                maxBarWidth: 8,
                supportCSSTransform: true,
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

export default AntdGroupBarDefinition;
