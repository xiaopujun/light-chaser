import {BaseInfoType} from "../../../designer/DesignerType";
import baseLineImg from "./base-line.png";
import AbstractLineDefinition from "../../antd-common/line/AbstractLineDefinition";
import {AntdLineProps} from "../../antd-common/line/AntdCommonLine";
import {BaseMenuMapping} from "../../common-component/common-types";
import {AntdBaseLineConfig} from "./AntdBaseLineConfig";

class AntdBaseLineDefinition extends AbstractLineDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd基础折线图",
            compKey: "AntdBaseLine",
            type: "折线图",
            typeKey: "line",
            desc: "基于Antd Designer实现的基础折线图组件",
        };
    }

    getChartImg(): string {
        return baseLineImg;
    }


    getMenuToConfigContentMap(): BaseMenuMapping | null {
        let menuToConfigContentMap = super.getMenuToConfigContentMap();
        menuToConfigContentMap!['style'] = AntdBaseLineConfig;
        return menuToConfigContentMap;
    }

    getInitConfig(): AntdLineProps {
        const data = [
            {"name": "1990", "value": 525},
            {"name": "1991", "value": 459},
            {"name": "1992", "value": 357},
            {"name": "1993", "value": 414},
            {"name": "1994", "value": 234},
            {"name": "1995", "value": 250},
            {"name": "1996", "value": 156}];
        return {
            info: {
                id: "",
                name: '基础折线图',
                type: 'AntdBaseLine',
                desc: '基于antd实现的基础折线图',
            },
            style: {
                data: data,
                xField: "name",
                yField: "value",
                smooth: false,
                supportCSSTransform: true,
                lineStyle: {
                    stroke: "#00dbffff",
                    lineWidth: 2,
                },
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#969696ff",
                            fontSize: 10,
                        },
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
                            fill: "#b1b1b1ff",
                            fontSize: 9,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9e9e9e7d",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    position: "bottom",
                    title: null,
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                point: {
                    size: 4,
                    color: "#35c6ff70",
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

export default AntdBaseLineDefinition;
