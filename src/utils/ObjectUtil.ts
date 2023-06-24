export const merge = (originalData: any, newData: any) => {
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
                merge(originalData[key], newValue);
            } else {
                originalData[key] = newValue;
            }
        } else {
            originalData[key] = newValue;
        }
    });
    return originalData;
}


export const stringToJsObj = (code: string) => {
    code = code.replace(/[\s+\n]+/g, '').replace(/'/g, '"');
    try {
        return JSON.parse(code);
    } catch (e) {
        return false;
    }
}