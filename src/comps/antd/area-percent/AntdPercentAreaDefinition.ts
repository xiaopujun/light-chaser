import {BaseInfoType} from "../../../designer/DesignerType";
import percentAreaImg from "./percent-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonArea";

class AntdPercentAreaDefinition extends AbstractAreaDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd百分比面积图",
            compKey: "AntdPercentArea",
            type: "条形图",
            typeKey: "area",
            desc: "基于Antd Designer实现的百分比面积图组件",
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
            info: {
                id: "",
                name: '百分比面积图',
                type: 'AntdPercentArea',
                desc: '基于antd实现的百分比面积图',
            },
            style: {
                data: data,
                xField: 'year',
                yField: 'value',
                seriesField: 'country',
                isPercent: true,
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
                supportCSSTransform: true,
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

export default AntdPercentAreaDefinition;
