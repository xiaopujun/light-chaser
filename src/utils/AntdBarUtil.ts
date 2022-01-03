/**
 * 用于antd-bar图表的属性拼装
 */
import merge from "deepmerge";
import * as initData from '../init/data/antd-bar';


/**
 * antd条形图分发
 * @param preState 上一个状态
 * @param data 本次更新的数据
 * @returns {*}
 */
export function antdBarPropertiesProcess(preState: any, data: any) {
    const {chartConfig, currentActive} = preState;
    const {activeId} = currentActive;
    let tempConfig = chartConfig.get(activeId);
    if ("color" in data) {
        tempConfig.antdBarConfig['color'] = null;
    }
    tempConfig.antdBarConfig = merge(tempConfig.antdBarConfig, data);
    return {...preState, ...chartConfig}
}

/**
 * 获取条形图的数据分组个数,主要用于设置图形的颜色组
 * @param data
 */
export function getBarDataGroup(data: any) {
    let groups = new Set();
    data.map((item: any, index: any) => {
        groups.add(item.type);
    })
    return groups.size;
}