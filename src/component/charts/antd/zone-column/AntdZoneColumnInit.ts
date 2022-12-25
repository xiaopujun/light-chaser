import BaseInit, {BaseInfo} from "../../interface/BaseInit";

export default class AntdZoneColumnInit implements BaseInit {

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '区间柱状图',
                type: 'AntdZoneColumn'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                data: [
                    {
                        name: '分类一',
                        value: [76, 100],
                    },
                    {
                        name: '分类二',
                        value: [56, 108],
                    },
                    {
                        name: '分类三',
                        value: [38, 129],
                    },
                ],
                seriesField: 'name',
                xField: 'name',
                yField: 'value',
                isRange: true,
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
                color: 'rgb(0,255,234)',
                maxColumnWidth: 8
            }
        };
    }

    getBaseInfo(): BaseInfo {
        return {
            name: "区间柱状图",
            value: "AntdZoneColumn",
            typeInfo: {
                name: "柱状图",
                type: "column"
            },
        };
    }

}
