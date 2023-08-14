import {BaseInfoType} from "../../../designer/DesignerType";
import baseAreaImg from "./base-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonArea";

class AntdBaseAreaDefinition extends AbstractAreaDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础面积图",
            compKey: "AntdBaseArea",
            type: "条形图",
            typeKey: "area",
            desc: "基于Antd Designer实现的基础面积图组件",
        };
    }

    getChartImg(): string {
        return baseAreaImg;
    }

    getInitConfig(): AntdAreaProps {
        const data = [
            {
                "name": "2006 Q3",
                "value": 1
            },
            {
                "name": "2008 Q2",
                "value": 1.67
            },
            {
                "name": "2009 Q1",
                "value": 2.39
            },
            {
                "name": "2009 Q2",
                "value": 0.71
            }
        ]
        return {
            info: {
                id: "",
                name: '基础面积图',
                type: 'AntdBaseArea',
                desc: '基于antd实现的基础面积图',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
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
                color: '#00d7ff',
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

export default AntdBaseAreaDefinition;
