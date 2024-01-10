import stackAreaImg from "./stack-area.png";
import AbstractAreaDefinition from "../../antd-common/area/AbstractAreaDefinition";
import {AntdAreaProps} from "../../antd-common/area/AntdCommonAreaController";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";

class AntdStackAreaDefinition extends AbstractAreaDefinition {

    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd堆叠面积图",
            compKey: "AntdStackArea",
            categorize: "chart",
            subCategorize: "area",
        };
    }

    getChartImg(): string {
        return stackAreaImg;
    }

    getInitConfig(): AntdAreaProps {
        const data = [
            {
                "country": "北美",
                "date": 1965,
                "value": 1390.5
            },
            {
                "country": "北美",
                "date": 1966,
                "value": 1469.5
            },
            {
                "country": "北美",
                "date": 1967,
                "value": 1521.7
            },
            {
                "country": "北美",
                "date": 1968,
                "value": 1615.9
            },
            {
                "country": "北美",
                "date": 1969,
                "value": 1703.7
            },
            {
                "country": "北美",
                "date": 1970,
                "value": 1767.8
            },
            {
                "country": "北美",
                "date": 1971,
                "value": 1806.2
            },
            {
                "country": "北美",
                "date": 1972,
                "value": 1903.5
            },
            {
                "country": "北美",
                "date": 1973,
                "value": 1986.6
            },
            {
                "country": "北美",
                "date": 1974,
                "value": 1952
            },
            {
                "country": "北美",
                "date": 1975,
                "value": 1910.4
            },
            {
                "country": "北美",
                "date": 1976,
                "value": 2015.8
            },
            {
                "country": "北美",
                "date": 1977,
                "value": 2074.7
            },
            {
                "country": "北美",
                "date": 1978,
                "value": 2092.7
            },
            {
                "country": "北美",
                "date": 1979,
                "value": 2123.8
            },
            {
                "country": "北美",
                "date": 1980,
                "value": 2068.3
            },
            {
                "country": "北美",
                "date": 1981,
                "value": 2018
            },
            {
                "country": "北美",
                "date": 1982,
                "value": 1951.5
            },
            {
                "country": "北美",
                "date": 1983,
                "value": 1941.1
            },
            {
                "country": "北美",
                "date": 1984,
                "value": 2046.2
            },
            {
                "country": "北美",
                "date": 1985,
                "value": 2053.1
            },
            {
                "country": "北美",
                "date": 1986,
                "value": 2060.7
            },
            {
                "country": "北美",
                "date": 1987,
                "value": 2130.8
            },
            {
                "country": "北美",
                "date": 1988,
                "value": 2223.5
            },
            {
                "country": "北美",
                "date": 1989,
                "value": 2275.9
            },
            {
                "country": "北美",
                "date": 1990,
                "value": 2280.7
            },
            {
                "country": "北美",
                "date": 1991,
                "value": 2282
            },
            {
                "country": "北美",
                "date": 1992,
                "value": 2319.7
            },
            {
                "country": "北美",
                "date": 1993,
                "value": 2366.6
            },
            {
                "country": "北美",
                "date": 1994,
                "value": 2420.2
            },
            {
                "country": "北美",
                "date": 1995,
                "value": 2466.9
            },
            {
                "country": "北美",
                "date": 1996,
                "value": 2547.4
            },
            {
                "country": "北美",
                "date": 1997,
                "value": 2569
            },
            {
                "country": "北美",
                "date": 1998,
                "value": 2585.2
            },
            {
                "country": "北美",
                "date": 1999,
                "value": 2633.8
            },
            {
                "country": "北美",
                "date": 2000,
                "value": 2699.4
            },
            {
                "country": "北美",
                "date": 2001,
                "value": 2640.1
            },
            {
                "country": "北美",
                "date": 2002,
                "value": 2687.7
            },
            {
                "country": "北美",
                "date": 2003,
                "value": 2700.7
            },
            {
                "country": "北美",
                "date": 2004,
                "value": 2759.4
            },
            {
                "country": "北美",
                "date": 2005,
                "value": 2775.6
            },
            {
                "country": "北美",
                "date": 2006,
                "value": 2761.9
            },
            {
                "country": "北美",
                "date": 2007,
                "value": 2809.5
            },
            {
                "country": "北美",
                "date": 2008,
                "value": 2759.4
            },
            {
                "country": "北美",
                "date": 2009,
                "value": 2632.5
            },
            {
                "country": "北美",
                "date": 2010,
                "value": 2720.7
            },
            {
                "country": "北美",
                "date": 2011,
                "value": 2722.9
            },
            {
                "country": "北美",
                "date": 2012,
                "value": 2665.1
            },
            {
                "country": "北美",
                "date": 2013,
                "value": 2738.3
            },
            {
                "country": "北美",
                "date": 2014,
                "value": 2766.8
            },
            {
                "country": "北美",
                "date": 2015,
                "value": 2739.7
            },
            {
                "country": "北美",
                "date": 2016,
                "value": 2761.9
            },
            {
                "country": "北美",
                "date": 2017,
                "value": 2772.8
            },
            {
                "country": "中南美",
                "date": 1965,
                "value": 109.2
            },
            {
                "country": "中南美",
                "date": 1966,
                "value": 115.7
            },
            {
                "country": "中南美",
                "date": 1967,
                "value": 120.5
            },
            {
                "country": "中南美",
                "date": 1968,
                "value": 128
            },
            {
                "country": "中南美",
                "date": 1969,
                "value": 134.4
            },
            {
                "country": "中南美",
                "date": 1970,
                "value": 142.2
            },
            {
                "country": "中南美",
                "date": 1971,
                "value": 157.5
            },
            {
                "country": "中南美",
                "date": 1972,
                "value": 169.5
            },
            {
                "country": "中南美",
                "date": 1973,
                "value": 186.3
            },
            {
                "country": "中南美",
                "date": 1974,
                "value": 195.5
            },
            {
                "country": "中南美",
                "date": 1975,
                "value": 198
            },
            {
                "country": "中南美",
                "date": 1976,
                "value": 211.7
            },
            {
                "country": "中南美",
                "date": 1977,
                "value": 223.8
            },
            {
                "country": "中南美",
                "date": 1978,
                "value": 236.5
            },
            {
                "country": "中南美",
                "date": 1979,
                "value": 251.8
            },
            {
                "country": "中南美",
                "date": 1980,
                "value": 262.9
            },
            {
                "country": "中南美",
                "date": 1981,
                "value": 262.7
            },
            {
                "country": "中南美",
                "date": 1982,
                "value": 265.9
            },
            {
                "country": "中南美",
                "date": 1983,
                "value": 268.3
            },
            {
                "country": "中南美",
                "date": 1984,
                "value": 278.3
            },
            {
                "country": "中南美",
                "date": 1985,
                "value": 285.2
            },
            {
                "country": "中南美",
                "date": 1986,
                "value": 304.2
            },
            {
                "country": "中南美",
                "date": 1987,
                "value": 315.4
            },
            {
                "country": "中南美",
                "date": 1988,
                "value": 324.6
            },
            {
                "country": "中南美",
                "date": 1989,
                "value": 329.9
            },
            {
                "country": "中南美",
                "date": 1990,
                "value": 331.1
            },
            {
                "country": "中南美",
                "date": 1991,
                "value": 339.7
            },
            {
                "country": "中南美",
                "date": 1992,
                "value": 355.8
            },
            {
                "country": "中南美",
                "date": 1993,
                "value": 368.8
            },
            {
                "country": "中南美",
                "date": 1994,
                "value": 390.9
            },
            {
                "country": "中南美",
                "date": 1995,
                "value": 408.3
            },
            {
                "country": "中南美",
                "date": 1996,
                "value": 425.8
            },
            {
                "country": "中南美",
                "date": 1997,
                "value": 448.2
            },
            {
                "country": "中南美",
                "date": 1998,
                "value": 465.5
            },
            {
                "country": "中南美",
                "date": 1999,
                "value": 463.7
            },
            {
                "country": "中南美",
                "date": 2000,
                "value": 476.1
            },
            {
                "country": "中南美",
                "date": 2001,
                "value": 477.7
            },
            {
                "country": "中南美",
                "date": 2002,
                "value": 483.5
            },
            {
                "country": "中南美",
                "date": 2003,
                "value": 489.3
            },
            {
                "country": "中南美",
                "date": 2004,
                "value": 515.5
            },
            {
                "country": "中南美",
                "date": 2005,
                "value": 533.6
            },
            {
                "country": "中南美",
                "date": 2006,
                "value": 564
            },
            {
                "country": "中南美",
                "date": 2007,
                "value": 587
            },
            {
                "country": "中南美",
                "date": 2008,
                "value": 605.8
            },
            {
                "country": "中南美",
                "date": 2009,
                "value": 596.8
            },
            {
                "country": "中南美",
                "date": 2010,
                "value": 632.5
            },
            {
                "country": "中南美",
                "date": 2011,
                "value": 658.9
            },
            {
                "country": "中南美",
                "date": 2012,
                "value": 676.5
            },
            {
                "country": "中南美",
                "date": 2013,
                "value": 692
            },
            {
                "country": "中南美",
                "date": 2014,
                "value": 697.7
            },
            {
                "country": "中南美",
                "date": 2015,
                "value": 701.1
            },
            {
                "country": "中南美",
                "date": 2016,
                "value": 696.8
            },
            {
                "country": "中南美",
                "date": 2017,
                "value": 700.6
            },
            {
                "country": "欧洲",
                "date": 1965,
                "value": 1058.1
            },
            {
                "country": "欧洲",
                "date": 1966,
                "value": 1089.7
            },
            {
                "country": "欧洲",
                "date": 1967,
                "value": 1121.7
            },
            {
                "country": "欧洲",
                "date": 1968,
                "value": 1196.6
            },
            {
                "country": "欧洲",
                "date": 1969,
                "value": 1285.5
            },
            {
                "country": "欧洲",
                "date": 1970,
                "value": 1369
            },
            {
                "country": "欧洲",
                "date": 1971,
                "value": 1406.2
            },
            {
                "country": "欧洲",
                "date": 1972,
                "value": 1472.7
            },
            {
                "country": "欧洲",
                "date": 1973,
                "value": 1558
            },
            {
                "country": "欧洲",
                "date": 1974,
                "value": 1535.5
            },
            {
                "country": "欧洲",
                "date": 1975,
                "value": 1519.3
            },
            {
                "country": "欧洲",
                "date": 1976,
                "value": 1606.9
            },
            {
                "country": "欧洲",
                "date": 1977,
                "value": 1632.4
            },
            {
                "country": "欧洲",
                "date": 1978,
                "value": 1687.5
            },
            {
                "country": "欧洲",
                "date": 1979,
                "value": 1749.6
            },
            {
                "country": "欧洲",
                "date": 1980,
                "value": 1706.4
            },
            {
                "country": "欧洲",
                "date": 1981,
                "value": 1661.4
            },
            {
                "country": "欧洲",
                "date": 1982,
                "value": 1630.2
            },
            {
                "country": "欧洲",
                "date": 1983,
                "value": 1645.2
            },
            {
                "country": "欧洲",
                "date": 1984,
                "value": 1686.9
            },
            {
                "country": "欧洲",
                "date": 1985,
                "value": 1779.4
            },
            {
                "country": "欧洲",
                "date": 1986,
                "value": 1811.3
            },
            {
                "country": "欧洲",
                "date": 1987,
                "value": 1849.7
            },
            {
                "country": "欧洲",
                "date": 1988,
                "value": 1870
            },
            {
                "country": "欧洲",
                "date": 1989,
                "value": 1875
            },
            {
                "country": "欧洲",
                "date": 1990,
                "value": 1853.3
            },
            {
                "country": "欧洲",
                "date": 1991,
                "value": 1844.6
            },
            {
                "country": "欧洲",
                "date": 1992,
                "value": 1814.1
            },
            {
                "country": "欧洲",
                "date": 1993,
                "value": 1805.3
            },
            {
                "country": "欧洲",
                "date": 1994,
                "value": 1791.3
            },
            {
                "country": "欧洲",
                "date": 1995,
                "value": 1836.2
            },
            {
                "country": "欧洲",
                "date": 1996,
                "value": 1896.1
            },
            {
                "country": "欧洲",
                "date": 1997,
                "value": 1896.4
            },
            {
                "country": "欧洲",
                "date": 1998,
                "value": 1918.8
            },
            {
                "country": "欧洲",
                "date": 1999,
                "value": 1907.7
            },
            {
                "country": "欧洲",
                "date": 2000,
                "value": 1932.1
            },
            {
                "country": "欧洲",
                "date": 2001,
                "value": 1959.2
            },
            {
                "country": "欧洲",
                "date": 2002,
                "value": 1954.8
            },
            {
                "country": "欧洲",
                "date": 2003,
                "value": 1991.6
            },
            {
                "country": "欧洲",
                "date": 2004,
                "value": 2025.4
            },
            {
                "country": "欧洲",
                "date": 2005,
                "value": 2037.4
            },
            {
                "country": "欧洲",
                "date": 2006,
                "value": 2056.4
            },
            {
                "country": "欧洲",
                "date": 2007,
                "value": 2041.7
            },
            {
                "country": "欧洲",
                "date": 2008,
                "value": 2038.5
            },
            {
                "country": "欧洲",
                "date": 2009,
                "value": 1932.1
            },
            {
                "country": "欧洲",
                "date": 2010,
                "value": 2001.1
            },
            {
                "country": "欧洲",
                "date": 2011,
                "value": 1949.1
            },
            {
                "country": "欧洲",
                "date": 2012,
                "value": 1944.3
            },
            {
                "country": "欧洲",
                "date": 2013,
                "value": 1934
            },
            {
                "country": "欧洲",
                "date": 2014,
                "value": 1871.2
            },
            {
                "country": "欧洲",
                "date": 2015,
                "value": 1908.7
            },
            {
                "country": "欧洲",
                "date": 2016,
                "value": 1934.6
            },
            {
                "country": "欧洲",
                "date": 2017,
                "value": 1969.5
            }
        ];
        return {
            base: {
                id: "",
                name: '堆叠面积图',
                type: 'AntdStackArea',
            },
            style: {
                data: data,
                xField: "date",
                yField: "value",
                seriesField: "country",
                smooth: false,
                supportCSSTransform: true,
                color: ["#4ebfffff", "#00a3ffff", "#0060b1ff"],
                xAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#8c8c8cff",
                            fontSize: 10,
                        },
                    },
                    line: null,
                    tickLine: null,
                    subTickLine: null,
                    title: null,
                    position: "left",
                },
                yAxis: {
                    grid: null,
                    label: {
                        style: {
                            fill: "#a8a8a8ff",
                            fontSize: 10,
                        },
                    },
                    line: {
                        style: {
                            stroke: "#9e9e9e6e",
                            lineWidth: 1,
                        },
                    },
                    tickLine: null,
                    subTickLine: null,
                    title: null,
                    position: "bottom",
                },
                legend: {
                    position: "top",
                    layout: "horizontal",
                    itemName: {
                        style: {
                            fill: "#a4a4a4ff",
                            fontSize: 10,
                        },
                    },
                },
                animation: {
                    appear: {
                        animation: "wave-in",
                        duration: 3000,
                    },
                },
                line: {
                    style: {
                        lineWidth: 0,
                    },
                },
                point: {
                    size: 0,
                    style: {
                        fill: "#ffffffff",
                    },
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

export default AntdStackAreaDefinition;
