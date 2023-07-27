import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ThemeItemType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import previewImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import AntdBar from "./AntdBar";
import {ConfigType} from "../../../designer/right/ConfigType";
import {BaseInfoProps} from "../../common-fragment/base-info/BaseInfo";
import {BarOptions} from "@antv/g2plot";
import {ShapeAttrs} from "@antv/g-base";

export interface AntdBaseBarMenuMapping {
    info: React.ComponentType<BaseInfoProps<BaseInfoType>>;
    style: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}

export type WritableBarOptions = {
    -readonly [K in keyof BarOptions]: BarOptions[K];
};

export type ClazzTemplate<C> = new () => C | null;

const AntdBaseBarStyleConfig = React.lazy(() => import("./AntdBaseBarConfig").then((module) => ({default: module.AntdBaseBarStyleConfig,})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));


class AntdBaseBarCore extends AbstractCustomComponentDefinition<AntdBar, AntdBaseBarMenuMapping, BarOptions> {
    getBaseInfo(): BaseInfoType {
        return {
            compName: "Antd条形图",
            compKey: "AntdBaseBar",
            type: "条形图",
            typeKey: "bar",
            desc: "基于Antd Designer实现的条形图组件",
        };
    }

    getChartImg(): string {
        return previewImg;
    }

    getComponent(): ClazzTemplate<AntdBar> | null {
        return AntdBar;
    }

    getMenuList(): Array<MenuInfo> {
        return getDefaultMenuList();
    }

    getMenuToConfigContentMap(): AntdBaseBarMenuMapping | null {
        return {
            info: BaseInfo,
            style: AntdBaseBarStyleConfig,
            data: DataConfig,
            animation: AnimationConfig,
            theme: ThemeConfig
        };
    }

    updateTheme(newTheme: ThemeItemType, oldStyle: BarOptions): void {
        if (!newTheme)
            return;
        let newStyle: WritableBarOptions = oldStyle
        const {colors: {main, text, supplementary, emphasize, background, auxiliary}} = newTheme;
        //图形
        if (oldStyle?.color)
            newStyle.color = main;
        //图例
        if ((oldStyle.legend) && (oldStyle.legend.itemName?.style as ShapeAttrs)?.fill)
            (oldStyle!.legend!.itemName!.style as ShapeAttrs).fill = text;
        //x轴-文本
        if ((oldStyle?.xAxis) && (oldStyle?.xAxis?.label?.style as ShapeAttrs).fill)
            (oldStyle!.xAxis!.label!.style as ShapeAttrs).fill = text;
        //x轴-标题
        if ((oldStyle?.xAxis) && (oldStyle?.xAxis?.title as ShapeAttrs)?.fill)
            (oldStyle!.xAxis!.title!.style as ShapeAttrs).fill = text;
        //x轴-轴线
        if ((oldStyle?.xAxis) && (oldStyle?.xAxis?.line?.style as ShapeAttrs).stroke)
            (oldStyle!.xAxis!.line!.style as ShapeAttrs).stroke = emphasize;
        //x轴-网格线
        if ((oldStyle?.xAxis) && (oldStyle?.xAxis?.grid?.line?.style as ShapeAttrs).stroke)
            (oldStyle!.xAxis!.grid!.line!.style as ShapeAttrs).stroke = auxiliary;
        //x轴-刻度线
        if ((oldStyle?.xAxis) && (oldStyle?.xAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (oldStyle!.xAxis!.tickLine!.style as ShapeAttrs).stroke = supplementary;
        //x轴-子刻度线
        if ((oldStyle?.xAxis) && (oldStyle?.xAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (oldStyle!.xAxis!.subTickLine!.style as ShapeAttrs).stroke = auxiliary;
        //y轴-文本
        if ((oldStyle?.yAxis) && (oldStyle?.yAxis?.label?.style as ShapeAttrs).fill)
            (oldStyle!.yAxis!.label!.style as ShapeAttrs).fill = text;
        //y轴-标题
        if ((oldStyle?.yAxis) && (oldStyle?.yAxis?.title as ShapeAttrs)?.fill)
            (oldStyle!.yAxis!.title!.style as ShapeAttrs).fill = text;
        //y轴-轴线
        if ((oldStyle?.yAxis) && (oldStyle?.yAxis?.line?.style as ShapeAttrs).stroke)
            (oldStyle!.yAxis!.line!.style as ShapeAttrs).stroke = emphasize;
        //y轴-网格线
        if ((oldStyle?.yAxis) && (oldStyle?.yAxis?.grid?.line?.style as ShapeAttrs).stroke)
            (oldStyle!.yAxis!.grid!.line!.style as ShapeAttrs).stroke = auxiliary;
        //y轴-刻度线
        if ((oldStyle?.yAxis) && (oldStyle?.yAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (oldStyle!.yAxis!.tickLine!.style as ShapeAttrs).stroke = supplementary;
        //y轴-子刻度线
        if ((oldStyle?.yAxis) && (oldStyle?.yAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (oldStyle!.yAxis!.subTickLine!.style as ShapeAttrs).stroke = auxiliary;
    }


    // updateTheme(newTheme: ThemeItemType, oldStyle: BarOptions): void {
    //     if (!newTheme || !oldStyle) return;
    //
    //     const {colors: {main, text, supplementary, emphasize, auxiliary}} = newTheme;
    //
    //     // Helper function to update the style property if it exists and has a 'fill' or 'stroke' property
    //     function updateStyleFillOrStroke(style: ShapeAttrs | undefined, color: string): void {
    //         if (style?.fill) style.fill = color;
    //         if (style?.stroke) style.stroke = color;
    //     }
    //
    //     // Update graph color
    //     if (oldStyle.color) oldStyle.color = main;
    //
    //     // Update legend item name style
    //     updateStyleFillOrStroke((oldStyle.legend) && (oldStyle.legend.itemName as ShapeAttrs)?.style, text);
    //
    //     // Update x-axis properties
    //     const {xAxis} = oldStyle;
    //     if (xAxis) {
    //         updateStyleFillOrStroke(xAxis.label?.style, text!);
    //         updateStyleFillOrStroke(xAxis.title?.style, text!);
    //         updateStyleFillOrStroke(xAxis.line?.style, emphasize!);
    //         updateStyleFillOrStroke(xAxis.grid?.line?.style, auxiliary!);
    //         updateStyleFillOrStroke(xAxis.tickLine?.style, supplementary!);
    //         updateStyleFillOrStroke(xAxis.subTickLine?.style, auxiliary!);
    //     }
    //
    //     // Update y-axis properties
    //     const {yAxis} = oldStyle;
    //     if (yAxis) {
    //         updateStyleFillOrStroke(yAxis.label?.style, text!);
    //         updateStyleFillOrStroke(yAxis.title?.style, text!);
    //         updateStyleFillOrStroke(yAxis.line?.style, emphasize!);
    //         updateStyleFillOrStroke(yAxis.grid?.line?.style, auxiliary!);
    //         updateStyleFillOrStroke(yAxis.tickLine?.style, supplementary!);
    //         updateStyleFillOrStroke(yAxis.subTickLine?.style, auxiliary!);
    //     }
    // }


}

export default AntdBaseBarCore;
