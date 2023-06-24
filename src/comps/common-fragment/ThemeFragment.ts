import {ThemeItemType} from "../../designer/DesignerType";

export const updateTheme = (newTheme: ThemeItemType, sourceStyle: any) => {
    if (!newTheme)
        return;
    const {colors: {main, text, supplementary, emphasize, background, auxiliary}} = newTheme;
    //边框
    if (sourceStyle?.style?.baseStyle?.border)
        sourceStyle.style.baseStyle.border = `2px solid ${emphasize}`;
    //背景
    if (sourceStyle?.style?.baseStyle?.backgroundColor)
        sourceStyle.style.baseStyle.backgroundColor = background;
    //图形
    if (sourceStyle?.style?.chartStyle?.color)
        sourceStyle.style.chartStyle.color = main;
    //图例
    if (sourceStyle?.style?.chartStyle?.legend?.itemName?.style?.fill)
        sourceStyle.style.chartStyle.legend.itemName.style.fill = text;
    //x轴-文本
    if (sourceStyle?.style?.chartStyle?.xAxis?.label?.style?.fill)
        sourceStyle.style.chartStyle.xAxis.label.style.fill = text;
    //x轴-标题
    if (sourceStyle?.style?.chartStyle?.xAxis?.title?.style?.fill)
        sourceStyle.style.chartStyle.xAxis.title.style.fill = text;
    //x轴-轴线
    if (sourceStyle?.style?.chartStyle?.xAxis?.line?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.line.style.stroke = emphasize;
    //x轴-网格线
    if (sourceStyle?.style?.chartStyle?.xAxis?.grid?.line?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.grid.line.style.stroke = auxiliary;
    //x轴-刻度线
    if (sourceStyle?.style?.chartStyle?.xAxis?.tickLine?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.tickLine.style.stroke = supplementary;
    //x轴-子刻度线
    if (sourceStyle?.style?.chartStyle?.xAxis?.subTickLine?.style?.stroke)
        sourceStyle.style.chartStyle.xAxis.subTickLine.style.stroke = auxiliary;
    //y轴-文本
    if (sourceStyle?.style?.chartStyle?.yAxis?.label?.style?.fill)
        sourceStyle.style.chartStyle.yAxis.label.style.fill = text;
    //y轴-标题
    if (sourceStyle?.style?.chartStyle?.yAxis?.title?.style?.fill)
        sourceStyle.style.chartStyle.yAxis.title.style.fill = text;
    //y轴-轴线
    if (sourceStyle?.style?.chartStyle?.yAxis?.line?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.line.style.stroke = emphasize;
    //y轴-网格线
    if (sourceStyle?.style?.chartStyle?.yAxis?.grid?.line?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.grid.line.style.stroke = auxiliary;
    //y轴-刻度线
    if (sourceStyle?.style?.chartStyle?.yAxis?.tickLine?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.tickLine.style.stroke = supplementary;
    //y轴-子刻度线
    if (sourceStyle?.style?.chartStyle?.yAxis?.subTickLine?.style?.stroke)
        sourceStyle.style.chartStyle.yAxis.subTickLine.style.stroke = auxiliary;
}