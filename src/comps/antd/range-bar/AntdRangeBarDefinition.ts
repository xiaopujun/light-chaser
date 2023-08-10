import {BaseInfoType} from "../../../designer/DesignerType";
import rangeBarImg from "./range-bar.png";
import {AntdBarProps} from "../../antd-common/bar/AntdCommonBar";
import AbstractBarDefinition from "../../antd-common/bar/AbstractBarDefinition";

class AntdRangeBarDefinition extends AbstractBarDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd区间条形图",
            compKey: "AntdRangeBar",
            type: "条形图",
            typeKey: "bar",
            desc: "基于Antd Designer实现的区间条形图组件",
        };
    }

    getChartImg(): string {
        return rangeBarImg;
    }

    getInitConfig(): AntdBarProps {
        const data = [
            {type: '分类一', values: [76, 100]},
            {type: '分类二', values: [56, 108]},
            {type: '分类三', values: [38, 129]},
        ];
        return {
            info: {
                id: "",
                name: 'Antd区间条形图',
                type: 'AntdRangeBar',
                desc: '基于Antd Designer实现的区间条形图组件',
            },
            style: {
                data: data,
                xField: 'values',
                yField: 'type',
                isRange: true,
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
                color: '#00d7ff',
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

export default AntdRangeBarDefinition;
