export const merge = (originalData: any, newData: any) => {
    Object.keys(newData).forEach(key => {
        const newValue = newData[key];
        if (originalData.hasOwnProperty(key)) {
            if (Array.isArray(newValue)) {
                originalData[key] = newValue;
            } else if (newValue && typeof newValue === "object"
                && typeof originalData[key] === "object" && !!originalData[key]) {
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
    code = code.replaceAll(/[\n\s]/g, "");
    let template = `(function(){return ${code};})()`;
    try {
        return eval(template);
    } catch (e) {
        console.error('javascript code error: ', e);
    }
}