import {OPEN_RIGHT_SIIDE_BOX, CLOSE_RIGHT_SILDE_BOX} from '../constant';


const initState = {
        config: {
            data: [
                {
                    label: 'Mon.',
                    type: 'series1',
                    value: 2800,
                },
                {
                    label: 'Mon.',
                    type: 'series2',
                    value: 2260,
                },
                {
                    label: 'Tues.',
                    type: 'series1',
                    value: 1800,
                },
                {
                    label: 'Tues.',
                    type: 'series2',
                    value: 1300,
                },
                {
                    label: 'Wed.',
                    type: 'series1',
                    value: 950,
                },
                {
                    label: 'Wed.',
                    type: 'series2',
                    value: 900,
                },
                {
                    label: 'Thur.',
                    type: 'series1',
                    value: 500,
                },
                {
                    label: 'Thur.',
                    type: 'series2',
                    value: 390,
                },
                {
                    label: 'Fri.',
                    type: 'series1',
                    value: 170,
                },
                {
                    label: 'Fri.',
                    type: 'series2',
                    value: 100,
                },
            ],
            isGroup: true,
            xField: 'value',
            yField: 'label',
            seriesField: 'type',
            marginRatio: 0,
            label: {
                position: 'middle',
                layout: [
                    {type: 'interval-adjust-position'},
                    {type: 'interval-hide-overlap'},
                    {type: 'adjust-color'},
                ],
            },
            xAxis: {
                grid: null,
                label: {
                    // content: null,
                    style: {
                        fill: 'rgb(0,255,234)'
                    }
                }
            },
            yAxis: {
                grid: null,
                line: null,
                tickLine: null,
                label: {style: {fill: 'rgb(0,255,234)'}}
            },
        }
    }
;
export default function rightSlideBoxReducer(preState = initState, action) {
    const {type, data} = action;
    let res = {...preState.config, ...data}
    res = {...preState, ...{config: res}}
    return res;
}