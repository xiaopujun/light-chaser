import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableAreaOptions} from "../types";
import {Area} from "@antv/g2plot";
import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {AntdBaseDesignerComponent} from "../AntdBaseDesignerComponent";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";

export interface AntdAreaProps extends ComponentBaseProps {
    style?: WritableAreaOptions;
}

export default class AntdCommonArea extends AntdBaseDesignerComponent<Area, AntdAreaProps> {

    async create(container: HTMLElement, config: AntdAreaProps): Promise<this> {
        return super.commonCreate(container, Area, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdAreaProps | null {
        return this.config;
    }

    update(config: AntdAreaProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Area, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme)
            return;
        const styleConfig = this.config?.style!;
        const {colors: {main, text, supplementary, emphasize, /*background,*/ auxiliary}} = newTheme;
        //图形
        if (styleConfig?.color)
            styleConfig.color = [main!];
        //图例
        if ((styleConfig.legend) && (styleConfig.legend.itemName?.style as ShapeAttrs)?.fill)
            (styleConfig!.legend!.itemName!.style as ShapeAttrs).fill = text;
        //x轴-文本
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.label?.style as ShapeAttrs).fill)
            (styleConfig!.xAxis!.label!.style as ShapeAttrs).fill = text;
        //x轴-标题
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.title as ShapeAttrs)?.fill)
            (styleConfig!.xAxis!.title!.style as ShapeAttrs).fill = text;
        //x轴-轴线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.line!.style as ShapeAttrs).stroke = emphasize;
        //x轴-网格线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.grid?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.grid!.line!.style as ShapeAttrs).stroke = auxiliary;
        //x轴-刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.tickLine!.style as ShapeAttrs).stroke = supplementary;
        //x轴-子刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.subTickLine!.style as ShapeAttrs).stroke = auxiliary;
        //y轴-文本
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.label?.style as ShapeAttrs)?.fill)
            (styleConfig!.yAxis!.label!.style as ShapeAttrs).fill = text;
        //y轴-标题
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.title as ShapeAttrs)?.fill)
            (styleConfig!.yAxis!.title!.style as ShapeAttrs).fill = text;
        //y轴-轴线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.line!.style as ShapeAttrs).stroke = emphasize;
        //y轴-网格线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.grid?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.grid!.line!.style as ShapeAttrs).stroke = auxiliary;
        //y轴-刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.tickLine!.style as ShapeAttrs).stroke = supplementary;
        //y轴-子刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.subTickLine!.style as ShapeAttrs).stroke = auxiliary;
        //重新渲染
        this.update({style: styleConfig} as any, {reRender: true, operateType: OperateType.OPTIONS});
    }
}