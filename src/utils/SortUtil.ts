/**
 * 数据分类
 */
export const dataSort = (key: string, data: Array<any>) => {
    if (data == null || data.length === 0)
        return 1;
    let item = data[0];
    if (key in item) {
        let set = new Set();
        for (let i = 0; i < data.length; i++)
            set.add(data[i].type);
        return set.size;
    } else {
        return data.length;
    }
}