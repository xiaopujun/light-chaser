export const merge = (originalData: any, newData: any) => {
    Object.keys(newData).forEach(key => {
        const newValue = newData[key];
        // 如果原数据中存在该属性，且新值是一个对象，则递归调用 replaceObjectProps 函数
        if (originalData.hasOwnProperty(key) && typeof newValue === "object" && newValue !== null) {
            merge(originalData[key], newValue);
        } else {
            // 否则，直接用新值替换原值
            originalData[key] = newValue;
        }
    });
    return originalData;
}