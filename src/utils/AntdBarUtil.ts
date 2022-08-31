/**
 * 用于antd-bar图表的属性拼装
 */
import merge from "deepmerge";


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
 * @description 计算antd类型图表数据中目标特征值存在的总体个数
 * @param data
 * @param condition
 */
export function getAntdDataSortCount(data: Array<any>, condition: string) {
    let groups = new Set();
    for (let i = 0; i < data.length; i++) {
        if (condition in data[i])
            groups.add(data[i][condition]);
        else
            throw new Error("操作对象中没有该属性，异常属性：" + condition);
    }
    return groups.size;
}