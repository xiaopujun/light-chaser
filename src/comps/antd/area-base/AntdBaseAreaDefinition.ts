import {BaseInfoType} from "../../../designer/DesignerType";
import baseAreaImg from "./base-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonArea";
import {BaseMenuMapping} from "../../common-component/common-types";
import {AntdBaseAreaConfig} from "./AntdBaseAreaConfig";

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

    getMenuToConfigContentMap(): BaseMenuMapping | null {
        let menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdBaseAreaConfig;
        return menuToConfigContentMap;
    }

    getInitConfig(): AntdAreaProps {
        const data = [
            {
                "name": "Q1",
                "value": 1
            },
            {
                "name": "Q2",
                "value": 1.67
            },
            {
                "name": "Q3",
                "value": -2.39
            },
            {
                "name": "Q4",
                "value": 4.71
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
                color: '#00d7ff',
                smooth: true,
                supportCSSTransform: true,
                isStack: false,
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
                    position: "bottom",
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
                    position: "left",
                    title: null
                },
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

export default AntdBaseAreaDefinition;
