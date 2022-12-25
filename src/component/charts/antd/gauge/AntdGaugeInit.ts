import BaseInit from "../../interface/BaseInit";

export default class AntdGaugeInit implements BaseInit {
    getCompName(): string {
        return "堆叠面积图";
    }

    getCompType(): string {
        return "AntdGauge";
    }

    getInitConfig(): Object {
        return {
            baseInfo: {
                name: '堆叠面积图',
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

}
