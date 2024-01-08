import scatterBubble from "./scatter-bubble.png";
import AbstractScatterDefinition from "../../antd-common/scatter/AbstractScatterDefinition";
import {AntdScatterProps} from "../../antd-common/scatter/AntdCommonScatterController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdScatterBubbleDefinition extends AbstractScatterDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd气泡图",
            compKey: "AntdScatterBubble",
            categorize: "chart",
            subCategorize: "scatter",
        };
    }

    getChartImg(): string {
        return scatterBubble;
    }

    getInitConfig(): AntdScatterProps {
        const data = [
            {
                "x": 42,
                "y": 38,
                "size": 20,
                "genre": "female"
            },
            {
                "x": 6,
                "y": 18,
                "size": 1,
                "genre": "female"
            },
            {
                "x": 58,
                "y": 24,
                "size": 20,
                "genre": "male"
            },
            {
                "x": 78,
                "y": 37,
                "size": 34,
                "genre": "male"
            },
            {
                "x": 55,
                "y": 56,
                "size": 53,
                "genre": "male"
            },
            {
                "x": 18,
                "y": 45,
                "size": 70,
                "genre": "male"
            },
            {
                "x": 42,
                "y": 44,
                "size": 28,
                "genre": "male"
            },
            {
                "x": 3,
                "y": 52,
                "size": 59,
                "genre": "male"
            },
            {
                "x": 31,
                "y": 18,
                "size": 97,
                "genre": "male"
            },
            {
                "x": 79,
                "y": 91,
                "size": 63,
                "genre": "male"
            },
            {
                "x": 93,
                "y": 23,
                "size": 23,
                "genre": "male"
            },
            {
                "x": 44,
                "y": 83,
                "size": 22,
                "genre": "male"
            }
        ];
        return {
            base: {
                id: "",
                name: 'Antd气泡图',
                type: 'AntdScatterBubble',
            },
            style: {
                data: data,
                xField: "x",
                yField: "y",
                colorField: "genre",
                sizeField: "size",
                size: [5, 20],
                shape: "circle",
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#9a9a9aff",
                            fontSize: 10,
                        },
                        offset: 16,
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
                        offset: 5,
                    },
                    line: {
                        style: {
                            stroke: "#a2a2a275",
                            lineWidth: 1,
                        },
                    },
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
                            fill: "#a0a0a0ff",
                            fontSize: 10,
                        },
                    },
                },
                supportCSSTransform: true,
                animation: {
                    appear: {
                        animation: "fade-in",
                        duration: 3000,
                    },
                },
                color: ["#116BA2", "#58c1ffff"],
                pointStyle: {
                    lineWidth: 0,
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

export default AntdScatterBubbleDefinition;
