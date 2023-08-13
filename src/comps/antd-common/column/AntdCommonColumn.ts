import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableColumnOptions} from "../types";
import {Column} from "@antv/g2plot";
import {ThemeItemType} from "../../../designer/DesignerType";
import {OperateType, UpdateOptions} from "../../../framework/core/AbstractComponent";
import {ShapeAttrs} from "@antv/g-base";
import {AntdBaseDesignerComponent} from "../AntdBaseDesignerComponent";

export interface AntdColumnProps extends ComponentBaseProps {
    style?: WritableColumnOptions;
}

export default class AntdCommonColumn extends AntdBaseDesignerComponent<Column, AntdColumnProps> {

    interval: NodeJS.Timer | null = null;

    //上一次数据连接状态 true：成功 false：失败
    lastReqState: boolean = true;
    //是否为断开后重新连接
    reConnect: boolean = false;

    async create(container: HTMLElement, config: AntdColumnProps): Promise<this> {
        return super.commonCreate(container, Column, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdColumnProps | null {
        return this.config;
    }

    update(config: AntdColumnProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Column, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme)
            return;
        const styleConfig = this.config?.style!;
        const {colors: {main, text, supplementary, emphasize, /*background,*/ auxiliary}} = newTheme;
        //图形
        if (styleConfig?.color)
            styleConfig.color = main;
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
        this.update({style: styleConfig}, {reRender: true, operateType: OperateType.OPTIONS});
    }
}