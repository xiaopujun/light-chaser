import {AbstractInit, BaseInfo} from "../../../framework/abstract/AbstractInit";
import barImg from './bar.png';
import {ElemConfig} from "../../../framework/types/DesignerType";

export default class AntdBaseBarInit extends AbstractInit {

    getInitConfig(): ElemConfig | Object {
        return {
            info: {
                id: '',
                name: '基础条形图',
                type: 'AntdBaseBar',
                des: '基于antd实现的基础条形图',
            },
            style: {
                baseStyle: {
                    padding: '10px',
                    backgroundColor: '#00000000',
                    border: '0px solid #00000000',
                    borderRadius: '0px',
                },
                chartStyle: {
                    data: [
                        {
                            name: '1951 年',
                            value: 38,
                        },
                        {
                            name: '1952 年',
                            value: 52,
                        },
                        {
                            name: '1956 年',
                            value: 61,
                        },
                    ],
                    xField: 'value',
                    yField: 'name',
                    seriesField: 'name',
                    xAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: 'rgb(0,255,234)'
                            },
                        },
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        position: 'right',
                    },
                    yAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: 'rgb(0,255,234)'
                            },
                        },
                        line: null,
                        tickLine: null,
                        subTickLine: null,
                        position: 'right',
                    },
                    color: 'rgb(0,255,234,0.2)',
                    legend: false,
                    maxBarWidth: 8,
                }
            },
            data: {
                sourceType: 'static',
                config: {
                    data: []
                }
            },
            animation: {},
            theme: {},
        };
    }

    getBaseInfo(): BaseInfo {
        return {
            name: "基础条形图",
            key: 'AntdBaseBar',
            typeName: "条形图",
            typeKey: "bar",
            sourceName: "Antd",
            sourceKey: "antd",
        };
    }

    getChartImg(): any {
        return barImg;
    }

}