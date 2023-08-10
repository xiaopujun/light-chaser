import {BaseInfoType} from "../../../designer/DesignerType";
import stackBarImg from "./stack-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBar";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";

class AntdStackBarDefinition extends AbstractBarDefinition {

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

    getInitConfig(): AntdBarProps {
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
