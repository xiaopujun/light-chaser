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

export function getTargetObjProperties(obj: any, key: string, value: any) {
    if (obj.constructor === Object) {
        //对象
        if (key in obj)
            return obj[key];
    } else if (obj.constructor === Array) {
        //数组
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].constructor === Object && key in obj[i])
                return obj[i][key];
        }
    } else {
        throw new Error('obj is not Object or Array');
    }
}