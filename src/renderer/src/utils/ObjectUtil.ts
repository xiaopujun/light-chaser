/**
 * 配置对象片段
 */
export interface ConfigureObjectFragments {
    [key: string]: ConfigureObjectFragments | string | number | null | undefined;
}

export default class ObjectUtil {
    /**
     * 合并两个对象，将newData中的属性合并到originalData中
     * @param originalData
     * @param newData
     */
    public static merge(originalData: any, newData: any): any {
        if (!originalData && newData)
            return newData;
        if (originalData && !newData)
            return originalData;
        Object.keys(newData).forEach(key => {
            const newValue = newData[key];
            if (originalData.hasOwnProperty(key)) {
                if (Array.isArray(newValue)) {
                    originalData[key] = newValue;
                } else if (newValue
                    && typeof newValue === "object"
                    && Object.keys(newValue).length > 0
                    && originalData[key]
                    && typeof originalData[key] === "object"
                    && !!originalData[key]) {
                    ObjectUtil.merge(originalData[key], newValue);
                } else {
                    originalData[key] = newValue;
                }
            } else {
                originalData[key] = newValue;
            }
        });
        return originalData;
    }

    /**
     * 将字符串转换为js对象
     */
    public static stringToJsObj(code: string): object | boolean {
        if (typeof code === 'undefined' || code == null || code === '')
            return false;
        code = code.replace(/[\s+\n]+/g, '').replace(/'/g, '"');
        try {
            return JSON.parse(code);
        } catch (e) {
            return false;
        }
    }

    /**
     * 获取原始对象中的属性值
     */
    public static getOriginValue(originObj: ConfigureObjectFragments, newObj: ConfigureObjectFragments): ConfigureObjectFragments {
        function findAndExtract(original: ConfigureObjectFragments, updated: ConfigureObjectFragments): ConfigureObjectFragments {
            const result: ConfigureObjectFragments = {};
            for (const key in updated) {
                if (typeof updated[key] === 'object' && !Array.isArray(updated[key]) && original[key]) {
                    if (original[key]) {
                        result[key] = findAndExtract(original[key] as ConfigureObjectFragments, updated[key] as ConfigureObjectFragments);
                    }
                } else {
                    result[key] = original[key];
                }
            }
            return result;
        }

        return findAndExtract(originObj, newObj);
    }
}

