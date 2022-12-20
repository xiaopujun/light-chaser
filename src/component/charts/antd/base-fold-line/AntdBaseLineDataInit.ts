import {cloneDeep} from 'lodash';

//基础线图
const AntdBaseLineDataInit = () => {
    return cloneDeep({
        baseInfo: {
            name: '基础线图',
            type: 'AntdBaseFoldLine'
        },
        baseStyle: {
            padding: '5px',
            backgroundColor: 'rgba(23,157,169,0.12)'
        },
        chartProps: {
            data: [
                {
                    "name": "2010-01",
                    "value": 1998
                },
                {
                    "name": "2010-02",
                    "value": 1850
                },
                {
                    "name": "2010-03",
                    "value": 1720
                },
                {
                    "name": "2010-04",
                    "value": 1320
                },
            ],
            xField: 'name',
            yField: 'value',
            color: '#00ebff',
            xAxis: {
                grid: null,
                line: null,
                label: {style: {fill: 'rgb(0,255,234)'}},
                type: 'time'
            },
            yAxis: {
                line: null,
                grid: null,
                label: {style: {fill: 'rgb(0,255,234)'}}
            },
        }
    });
};
export default AntdBaseLineDataInit;

