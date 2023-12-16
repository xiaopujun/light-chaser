import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableScatterOptions} from "../types";
import {Scatter} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";

export interface AntdScatterProps extends ComponentBaseProps {
    style?: WritableScatterOptions;
}

export default class AntdCommonScatterController extends AntdBaseDesignerController<Scatter, AntdScatterProps> {

    async create(container: HTMLElement, config: AntdScatterProps): Promise<void> {
        await super.commonCreate(container, Scatter, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdScatterProps | null {
        return this.config;
    }

    update(config: AntdScatterProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Scatter, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme) return;
        const styleConfig = this.config?.style!;
        const {colors: {main, mainText, supplementSecond, supplementFirst, subText}} = newTheme;
        //图形
        if (styleConfig?.color)
            styleConfig.color = [main!, mainText!, subText!, supplementFirst!, supplementSecond!];
        //图例
        if ((styleConfig.legend) && (styleConfig.legend.itemName?.style as ShapeAttrs))
            (styleConfig!.legend!.itemName!.style as ShapeAttrs).fill = mainText;
        //x轴-文本
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.label?.style as ShapeAttrs))
            (styleConfig!.xAxis!.label!.style as ShapeAttrs).fill = subText;
        //x轴-标题
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.title as ShapeAttrs))
            (styleConfig!.xAxis!.title!.style as ShapeAttrs).fill = mainText;
        //x轴-轴线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.line?.style as ShapeAttrs))
            (styleConfig!.xAxis!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //x轴-网格线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.grid?.line?.style as ShapeAttrs))
            (styleConfig!.xAxis!.grid!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //x轴-刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.tickLine?.style as ShapeAttrs))
            (styleConfig!.xAxis!.tickLine!.style as ShapeAttrs).stroke = supplementFirst;
        //x轴-子刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.subTickLine?.style as ShapeAttrs))
            (styleConfig!.xAxis!.subTickLine!.style as ShapeAttrs).stroke = supplementSecond;
        //y轴-文本
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.label?.style as ShapeAttrs))
            (styleConfig!.yAxis!.label!.style as ShapeAttrs).fill = subText;
        //y轴-标题
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.title as ShapeAttrs))
            (styleConfig!.yAxis!.title!.style as ShapeAttrs).fill = mainText;
        //y轴-轴线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.line?.style as ShapeAttrs))
            (styleConfig!.yAxis!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //y轴-网格线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.grid?.line?.style as ShapeAttrs))
            (styleConfig!.yAxis!.grid!.line!.style as ShapeAttrs).stroke = supplementFirst;
        //y轴-刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.tickLine?.style as ShapeAttrs))
            (styleConfig!.yAxis!.tickLine!.style as ShapeAttrs).stroke = supplementFirst;
        //y轴-子刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.subTickLine?.style as ShapeAttrs))
            (styleConfig!.yAxis!.subTickLine!.style as ShapeAttrs).stroke = supplementSecond;
        //重新渲染
        this.update({style: styleConfig} as any, {reRender: true});
    }
}