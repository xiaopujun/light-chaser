import BaseInit, {BaseInfo} from "../../interface/BaseInit";

export default class AntdGaugeInit implements BaseInit {

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '仪表盘',
                type: 'AntdGauge'
            },
            baseStyle: {
                padding: '5px',
                backgroundColor: 'rgba(23,157,169,0.12)'
            },
            chartProps: {
                percent: 0.75,
                range: {
                    color: ['#30BF78'],
                },
                indicator: {
                    pointer: {
                        style: {
                            stroke: '#D0D0D0',
                        },
                    },
                    pin: {
                        style: {
                            stroke: '#D0D0D0',
                        },
                    },
                },
                statistic: {
                    content: {
                        style: {
                            fontSize: '36px',
                            lineHeight: '36px',
                        },
                    },
                },
            }
        };
    }

    getBaseInfo(): BaseInfo {
        return {
            name: "仪表盘",
            value: "AntdGauge",
            typeInfo: {
                name: "进度图",
                type: "progress"
            },
        };
    }

}
