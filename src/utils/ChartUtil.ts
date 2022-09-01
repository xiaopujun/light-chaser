/**
 * 根据类型，获取图表初始化数据
 * @param type
 */
import chartInitDataMap from "../init/data/ChartDataInit";

export function getChartInitData(type: string) {
    if (chartInitDataMap.has(type)) {
        return chartInitDataMap.get(type)();
    } else {
        throw new Error('chartInitDataMap hos no relate init data');
    }
}