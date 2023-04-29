import {AbstractInit, BaseInfo} from "../../../types/lc-interface/AbstractInit";
import barImg from './bar.png';

export default class AntdBaseBarInit extends AbstractInit {

    getInitConfig(): Object {
        return {
            info: {
                name: '基础条形图',
                type: 'AntdBaseBar'
            },
            style: {
                baseStyle: {
                    padding: '10px',
                    backgroundColor: 'rgba(23,157,169,0.12)'
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
                        tickLine: null
                    },
                    yAxis: {
                        grid: null,
                        label: {
                            style: {
                                fill: 'rgb(0,255,234)'
                            },
                        },
                        line: null,
                        tickLine: null
                    },
                    color: 'rgb(0,255,234,0.2)',
                    legend: false,
                    maxBarWidth: 8
                }
            },
            data: {},
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