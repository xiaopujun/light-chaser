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
            throw new Error("There is no such attribute in the operation object, the exception attribute：" + condition);
    }
    return groups.size;
}