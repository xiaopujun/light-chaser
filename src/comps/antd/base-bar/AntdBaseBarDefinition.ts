import React from "react";
import {AbstractCustomComponentDefinition} from "../../../framework/core/AbstractCustomComponentDefinition";
import {BaseInfoType, ThemeItemType} from "../../../designer/DesignerType";
import {MenuInfo} from "../../../designer/right/MenuType";
import previewImg from "./bar.png";
import {getDefaultMenuList} from "../../../designer/right/util";
import AntdBaseBar from "./AntdBaseBar";
import {ConfigType} from "../../../designer/right/ConfigType";
import {BarOptions} from "@antv/g2plot";
import {ShapeAttrs} from "@antv/g-base";

export interface AntdBaseBarMenuMapping {
    info: React.ComponentType<ConfigType>;
    style: React.ComponentType<ConfigType>;
    data: React.ComponentType<ConfigType>;
    animation: React.ComponentType<ConfigType>;
    theme: React.ComponentType<ConfigType>;
}

export type WritableBarOptions = {
    -readonly [K in keyof BarOptions]?: BarOptions[K];
};

export type ClazzTemplate<C> = new () => C | null;

const AntdBaseBarStyleConfig = React.lazy(() => import("./AntdBaseBarConfig").then((module) => ({default: module.AntdBaseBarStyleConfig,})));
const AnimationConfig = React.lazy(() => import("../../common-fragment/animation-config/AnimationConfig"));
const ThemeConfig = React.lazy(() => import("../../common-fragment/theme-config/ThemeConfig"));
const BaseInfo = React.lazy(() => import("../../common-fragment/base-info/BaseInfo"));
const DataConfig = React.lazy(() => import("../../common-fragment/data-config/DataConfig"));


class AntdBaseBarDefinition extends AbstractCustomComponentDefinition<AntdBaseBar, AntdBaseBarMenuMapping, BarOptions> {
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

    getComponent(): ClazzTemplate<AntdBaseBar> | null {
        return AntdBaseBar;
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
}

export default AntdBaseBarDefinition;
