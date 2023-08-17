import {BaseInfoType} from "../../../designer/DesignerType";
import multiLineImg from "./multi-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLine";

class AntdMultiLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd多折线图",
            compKey: "AntdMultiLine",
            type: "折线图",
            typeKey: "line",
            desc: "基于Antd Designer实现的多折线图组件",
        };
    }

    getChartImg(): string {
        return multiLineImg;
    }

    getInitConfig(): AntdLineProps {
        const data = [
            {
                "year": "2007",
                "value": 1562,
                "category": "Gas fuel"
            },
            {
                "year": "2007",
                "value": 382,
                "category": "Cement production"
            },
            {
                "year": "2007",
                "value": 66,
                "category": "Gas flarinl"
            },
            {
                "year": "2008",
                "value": 3103,
                "category": "Liquid fuel"
            },
            {
                "year": "2008",
                "value": 3587,
                "category": "Solid fuel"
            },
            {
                "year": "2008",
                "value": 1630,
                "category": "Gas fuel"
            },
            {
                "year": "2008",
                "value": 388,
                "category": "Cement production"
            },
            {
                "year": "2008",
                "value": 69,
                "category": "Gas flarinl"
            },
            {
                "year": "2009",
                "value": 3042,
                "category": "Liquid fuel"
            },
            {
                "year": "2009",
                "value": 3590,
                "category": "Solid fuel"
            },
            {
                "year": "2009",
                "value": 1584,
                "category": "Gas fuel"
            },
            {
                "year": "2009",
                "value": 415,
                "category": "Cement production"
            },
            {
                "year": "2009",
                "value": 66,
                "category": "Gas flarinl"
            },
            {
                "year": "2010",
                "value": 3107,
                "category": "Liquid fuel"
            },
            {
                "year": "2010",
                "value": 3812,
                "category": "Solid fuel"
            },
            {
                "year": "2010",
                "value": 1696,
                "category": "Gas fuel"
            },
            {
                "year": "2010",
                "value": 446,
                "category": "Cement production"
            },
            {
                "year": "2010",
                "value": 67,
                "category": "Gas flarinl"
            },
            {
                "year": "2011",
                "value": 3134,
                "category": "Liquid fuel"
            },
            {
                "year": "2011",
                "value": 4055,
                "category": "Solid fuel"
            },
            {
                "year": "2011",
                "value": 1756,
                "category": "Gas fuel"
            },
            {
                "year": "2011",
                "value": 494,
                "category": "Cement production"
            },
            {
                "year": "2011",
                "value": 64,
                "category": "Gas flarinl"
            },
            {
                "year": "2012",
                "value": 3200,
                "category": "Liquid fuel"
            },
            {
                "year": "2012",
                "value": 4106,
                "category": "Solid fuel"
            },
            {
                "year": "2012",
                "value": 1783,
                "category": "Gas fuel"
            },
            {
                "year": "2012",
                "value": 519,
                "category": "Cement production"
            },
            {
                "year": "2012",
                "value": 65,
                "category": "Gas flarinl"
            },
            {
                "year": "2013",
                "value": 3220,
                "category": "Liquid fuel"
            },
            {
                "year": "2013",
                "value": 4126,
                "category": "Solid fuel"
            },
            {
                "year": "2013",
                "value": 1806,
                "category": "Gas fuel"
            },
            {
                "year": "2013",
                "value": 554,
                "category": "Cement production"
            },
            {
                "year": "2013",
                "value": 68,
                "category": "Gas flarinl"
            },
            {
                "year": "2014",
                "value": 3280,
                "category": "Liquid fuel"
            },
            {
                "year": "2014",
                "value": 4117,
                "category": "Solid fuel"
            },
            {
                "year": "2014",
                "value": 1823,
                "category": "Gas fuel"
            },
            {
                "year": "2014",
                "value": 568,
                "category": "Cement production"
            },
            {
                "year": "2014",
                "value": 68,
                "category": "Gas flarinl"
            }
        ]
        return {
            info: {
                id: "",
                name: '多折线图',
                type: 'AntdMultiLine',
                desc: '基于antd实现的多折线图',
            },
            style: {
                data: data,
                xField: 'year',
                yField: 'value',
                seriesField: 'category',
                supportCSSTransform: true,
                color: ['#fff', '#ff0000'],
                lineStyle: {
                    stroke: undefined,
                },
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
                    position: "left",
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
                smooth: true,
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
                        animation: 'wave-in',
                        duration: 3000,
                    },
                }
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

export default AntdMultiLineDefinition;
