import baseBarImg from "./base-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBarController";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdBaseBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础条形图",
            compKey: "AntdBaseBar",
            categorize: "chart",
            subCategorize: "bar",
        };
    }

    getChartImg(): string {
        return baseBarImg;
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
            base: {
                id: "",
                name: '基础条形图',
                type: 'AntdBaseBar',
            },
            style: {
                data: data,
                xField: "value",
                yField: "name",
                seriesField: "name",
                maxBarWidth: 8,
                color: ["#005d71ff", "#00d0e4ff", "#5bf0ffff"],
                barStyle: {
                    radius: 0,
                },
                supportCSSTransform: true,
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#878787ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#6f6f6f91",
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
                            fill: "#6b6b6bff",
                            fontSize: 10,
                        },
                        offset: 9,
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
                            fill: "#989898ff",
                            fontSize: 10,
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

export default AntdBaseBarDefinition;
