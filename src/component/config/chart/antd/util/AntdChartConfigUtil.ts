/**
 * 计算填充色
 */
export const calculateFillColor = (chartProps: any) => {
    const {color} = chartProps;
    if (color == undefined)
        return ['#02e9fe']
    if (typeof color == 'string')
        return [color];
    else
        return color;
}

/**
 * 计算图例配置信息
 */
export const calculateLegendConfig = (chartProps: any) => {
    let res = {visible: false};
    const {legend} = chartProps;
    if (!legend)
        return res;
    else {
        res = {
            ...res, ...{
                visible: true,
                position: legend?.position,
                direction: legend?.layout,
                textColor: legend?.itemName?.style?.fill
            }
        };
    }
    return res;
}


/**
 * 计算直角坐标系
 */
export const calculateRightAngleCoordinates = (chartProps: any) => {
    let res = {showX: false, showY: false};
    const {xAxis, yAxis} = chartProps;
    return {
        showX: xAxis?.grid != null,
        xLineColor: xAxis?.grid?.line?.style?.stroke,
        xWidth: xAxis?.grid?.line?.style?.lineWidth,
        xOpacity: xAxis?.grid?.line?.style?.opacity,
        xTitleColor: xAxis?.label?.style?.fill,
        showY: yAxis?.grid != null,
        yLineColor: yAxis?.grid?.line?.style?.stroke,
        yWidth: yAxis?.grid?.line?.style?.lineWidth,
        yOpacity: yAxis?.grid?.line?.style?.opacity,
        yTitleColor: yAxis?.label?.style?.fill,
    };
}

/**
 * 计算条形宽度
 */
export const calculateBarWidth = (chartProps: any) => {
    const {maxBarWidth} = chartProps;
    return {barWidth: maxBarWidth}
}