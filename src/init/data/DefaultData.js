export const antdBar = {
    titleConfig: {
        mainTitle: "demo title",
        subTitle: "demo subtitle",
        mainTitleColor: "rgb(0,170,157)",
        subTitleColor: "rgb(0,114,105)",
        mainTitleSize: "14",
        subTitleSize: "12",
    },
    borderConfig: {
        borderColor: "rgb(0,255,234)",
        showBorder: true,
    },
    backgroundConfig: {
        showBg: true,
        backgroundColor: 'rgba(45, 97, 170, 0.25)',
    },
    antdBarConfig: {
        data: [
            {
                year: '1951 年',
                value: 38,
            },
            {
                year: '1952 年',
                value: 52,
            },
            {
                year: '1956 年',
                value: 61,
            },
            {
                year: '1957 年',
                value: 145,
            },
            {
                year: '1958 年',
                value: 48,
            },
        ],
        xField: 'value',
        yField: 'year',
        xAxis: {
            grid: {
                line: {
                    style: {
                        stroke: 'rgba(0,255,192,0.59)',
                        lineWidth: 2,
                        lineDash: [4, 5],
                        strokeOpacity: 0.7,
                        shadowColor: 'black',
                        shadowBlur: 10,
                        shadowOffsetX: 5,
                        shadowOffsetY: 5,
                        cursor: 'pointer'
                    }
                }
            },
            label: {
                style: {
                    fill: 'rgb(0,255,234)'
                },
            },
        },
        yAxis: {
            grid: null,
            line: null,
            tickLine: null,
            label: {style: {fill: 'rgb(0,255,234)'}}
        },
        color: 'rgb(0,255,234)',

    }
}


export const data1 = [
    {
        year: '1951 年',
        value: 38,
    },
    {
        year: '1952 年',
        value: 52,
    },
    {
        year: '1956 年',
        value: 61,
    },
    {
        year: '1957 年',
        value: 145,
    },
    {
        year: '1958 年',
        value: 48,
    },
    {
        year: '1959 年',
        value: 61,
    },
    {
        year: '1960 年',
        value: 123,
    },
    {
        year: '1959 年',
        value: 89,
    },
];
export const config1 = {
    data: data1,
    xAxis: {
        grid: null,
        label: {
            content: null,
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
    xField: 'value',
    yField: 'year',
    seriesField: 'year',
    legend: false,
    barStyle: {
        radius: [20, 20, 0, 0],
    },
};

export const data2 = {
    name: 'root',
    children: [
        {
            name: '分类 1',
            value: 560,
        },
        {
            name: '分类 2',
            value: 500,
        },
        {
            name: '分类 3',
            value: 150,
        },
        {
            name: '分类 4',
            value: 140,
        },
        {
            name: '分类 5',
            value: 115,
        },
        {
            name: '分类 6',
            value: 95,
        },
        {
            name: '分类 7',
            value: 90,
        },
        {
            name: '分类 8',
            value: 75,
        },
        {
            name: '分类 9',
            value: 98,
        },
        {
            name: '分类 10',
            value: 60,
        },
        {
            name: '分类 11',
            value: 45,
        },
        {
            name: '分类 12',
            value: 40,
        },
        {
            name: '分类 13',
            value: 40,
        },
        {
            name: '分类 14',
            value: 35,
        },
        {
            name: '分类 15',
            value: 40,
        },
        {
            name: '分类 16',
            value: 40,
        },
        {
            name: '分类 17',
            value: 40,
        },
        {
            name: '分类 18',
            value: 30,
        },
        {
            name: '分类 19',
            value: 28,
        },
        {
            name: '分类 20',
            value: 16,
        },
    ],
};
export const config2 = {
    data: data2,
    colorField: 'name',
};

export const data3 = [
    {name: 'G2', star: 10178},
    {name: 'G6', star: 7077},
    {name: 'F2', star: 7345},
    {name: 'L7', star: 2029},
    {name: 'X6', star: 298},
    {name: 'AVA', star: 806},
];
export const config3 = {
    data: data3.map((d) => ({...d, star: Math.log(d.star).toFixed(2)})),
    xField: 'name',
    yField: 'star',
    meta: {
        star: {
            alias: '分数',
            min: 0,
            nice: true,
        },
    },
    xAxis: {
        line: null,
        tickLine: null,
    },
    yAxis: {
        label: false,
        grid: {
            alternateColor: 'rgba(0, 0, 0, 0.04)',
        },
    },
    radius: 1,
    // 开启辅助点
    point: {},
    area: {},
};

export const config4 = {
    percent: 0.66,
    liquidStyle: {
        fill: 'rgb(30 193 255 / 85%)',
        stroke: '#00c4ff',
        lineWidth: 1,
    },
    outline: {
        border: 2,
        distance: 0,
    },
    wave: {length: 53, count: 4},
    statistic: {
        content: {
            style: {color: '#e1e1e1'}
        }
    }

};

export const data5 = [
    {
        name: 'X6',
        star: 297,
    },
    {
        name: 'G',
        star: 506,
    },
    {
        name: 'AVA',
        star: 805,
    },
    {
        name: 'G2Plot',
        star: 1478,
    },
    {
        name: 'L7',
        star: 2029,
    },
    {
        name: 'G6',
        star: 7100,
    },
    {
        name: 'F2',
        star: 7346,
    },
    {
        name: 'G2',
        star: 10178,
    },
];
export const config5 = {
    data: data5,
    xField: 'name',
    yField: 'star',
    maxAngle: 350,
    radius: 0.8,
    innerRadius: 0.2,
    tooltip: {
        formatter: function formatter(datum) {
            return {
                name: 'star数',
                value: datum.star,
            };
        },
    },
    colorField: 'star',
    color: function color(_ref) {
        var star = _ref.star;
        if (star > 10000) {
            return '#6349ec';
        } else if (star > 1000) {
            return '#ff9300';
        }
        return '#ff93a7';
    },
    barBackground: {},
    barStyle: {lineCap: 'round'},
    annotations: [
        {
            type: 'html',
            position: ['50%', '50%'],
            html: function html(container, view) {
                var coord = view.getCoordinate();
                var w = coord.polarRadius * coord.innerRadius * 1.15;
                return '<div style="transform:translate(-50%,-46%)">\n          <img width="'
                    .concat((w / 203) * 231, '" height="')
                    .concat(
                        w,
                        '" alt="" src="https://gw.alipayobjects.com/zos/antfincdn/zrh%24J08soH/AntV%252520LOGO%2525202.png">\n        </div>',
                    );
            },
        },
    ],
};

export const data6 = [
    {
        month: 'Jan',
        key: 'series1',
        value: 125,
    },
    {
        month: 'Jan',
        key: 'series2',
        value: 51,
    },
    {
        month: 'Feb',
        key: 'series1',
        value: 132,
    },
    {
        month: 'Feb',
        key: 'series2',
        value: 91,
    },
    {
        month: 'Mar',
        key: 'series1',
        value: 141,
    },
    {
        month: 'Mar',
        key: 'series2',
        value: 34,
    },
    {
        month: 'Apr',
        key: 'series1',
        value: 158,
    },
    {
        month: 'Apr',
        key: 'series2',
        value: 47,
    },
    {
        month: 'May',
        key: 'series1',
        value: 133,
    },
    {
        month: 'May',
        key: 'series2',
        value: 63,
    },
    {
        month: 'June',
        key: 'series1',
        value: 143,
    },
    {
        month: 'June',
        key: 'series2',
        value: 58,
    },
    {
        month: 'July',
        key: 'series1',
        value: 176,
    },
    {
        month: 'July',
        key: 'series2',
        value: 56,
    },
    {
        month: 'Aug',
        key: 'series1',
        value: 194,
    },
    {
        month: 'Aug',
        key: 'series2',
        value: 77,
    },
    {
        month: 'Sep',
        key: 'series1',
        value: 115,
    },
    {
        month: 'Sep',
        key: 'series2',
        value: 99,
    },
    {
        month: 'Oct',
        key: 'series1',
        value: 134,
    },
    {
        month: 'Oct',
        key: 'series2',
        value: 106,
    },
    {
        month: 'Nov',
        key: 'series1',
        value: 110,
    },
    {
        month: 'Nov',
        key: 'series2',
        value: 88,
    },
    {
        month: 'Dec',
        key: 'series1',
        value: 91,
    },
    {
        month: 'Dec',
        key: 'series2',
        value: 56,
    },
];
export const config6 = {
    data: data6,
    xField: 'month',
    yField: 'value',
    yAxis: {grid: {line: null}},
    legend: false,
    seriesField: 'key',
    stepType: 'hvh',
};

export const config7 = {
    data: [
        {
            name: '周口',
            value: 55
        },
        {
            name: '南阳',
            value: 120
        },
        {
            name: '西峡',
            value: 78
        },
        {
            name: '驻马店',
            value: 66
        },
        {
            name: '新乡',
            value: 80
        },
        {
            name: '信阳',
            value: 45
        },
        {
            name: '漯河',
            value: 29
        }
    ]
}

export const config8 = {
    data: [
        ['行1列1', '行1列2', '行1列3'],
        ['行2列1', '行2列2', '行2列3'],
        ['行3列1', '行3列2', '行3列3'],
        ['行4列1', '行4列2', '行4列3'],
        ['行5列1', '行5列2', '行5列3'],
        ['行6列1', '行6列2', '行6列3'],
        ['行7列1', '行7列2', '行7列3'],
        ['行8列1', '行8列2', '行8列3'],
        ['行9列1', '行9列2', '行9列3'],
        ['行10列1', '行10列2', '行10列3']
    ]
};

const data9 = [
    {
        type: '家具家电',
        sales: 38,
    },
    {
        type: '粮油副食',
        sales: 52,
    },
    {
        type: '生鲜水果',
        sales: 61,
    },
    {
        type: '美容洗护',
        sales: 145,
    },
    {
        type: '母婴用品',
        sales: 48,
    },
    {
        type: '进口食品',
        sales: 38,
    },
    {
        type: '食品饮料',
        sales: 38,
    },
    {
        type: '家庭清洁',
        sales: 38,
    },
];
export const config9 = {
    data: data9,
    xField: 'type',
    yField: 'sales',
    color: 'rgb(17,241,234)',
    label: {
        position: 'middle',
        style: {
            fill: '#e2e2e2',
            opacity: 0.6,
        },
    },
    xAxis: {
        label: {
            autoHide: true,
            autoRotate: false,
            style: {fill: 'rgb(0,255,234)'}
        },
    },
    yAxis: {
        grid: null,
        label: {style: {fill: 'rgb(0,255,234)'}}
    },
    meta: {
        type: {alias: '类别'},
        sales: {alias: '销售额'},
    },
};