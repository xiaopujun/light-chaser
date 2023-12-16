import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableLineOptions} from "../types";
import {Line} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";

export interface AntdLineProps extends ComponentBaseProps {
    style?: WritableLineOptions;
}

export default class AntdCommonLineController extends AntdBaseDesignerController<Line, AntdLineProps> {

    async create(container: HTMLElement, config: AntdLineProps): Promise<void> {
        await super.commonCreate(container, Line, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdLineProps | null {
        return this.config;
    }

    update(config: AntdLineProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Line, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme)
            return;
        const {type} = this.config?.base!;
        const styleConfig = this.config?.style!;
        const {colors: {main, mainText, supplementSecond, supplementFirst, subText}} = newTheme;
        //图形
        if (styleConfig?.color) {
            if (type === 'AntdMultiLine')
                styleConfig.color = [main!, supplementFirst!, supplementSecond!];
            else
                styleConfig.color = main;
        }
        //点
        if ((styleConfig?.point) && (styleConfig?.point?.style as ShapeAttrs))
            (styleConfig!.point!.style as ShapeAttrs).fill = undefined;
        //图例
        if ((styleConfig.legend) && (styleConfig.legend.itemName?.style as ShapeAttrs)?.fill)
            (styleConfig!.legend!.itemName!.style as ShapeAttrs).fill = mainText;
        //x轴-文本
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.label?.style as ShapeAttrs)?.fill)
            (styleConfig!.xAxis!.label!.style as ShapeAttrs).fill = mainText;
        //x轴-标题
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.title as ShapeAttrs)?.fill)
            (styleConfig!.xAxis!.title!.style as ShapeAttrs).fill = mainText;
        //x轴-轴线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.line!.style as ShapeAttrs).stroke = supplementSecond;
        //x轴-网格线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.grid?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.grid!.line!.style as ShapeAttrs).stroke = subText;
        //x轴-刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.tickLine!.style as ShapeAttrs).stroke = supplementFirst;
        //x轴-子刻度线
        if ((styleConfig?.xAxis) && (styleConfig?.xAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.xAxis!.subTickLine!.style as ShapeAttrs).stroke = subText;
        //y轴-文本
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.label?.style as ShapeAttrs)?.fill)
            (styleConfig!.yAxis!.label!.style as ShapeAttrs).fill = mainText;
        //y轴-标题
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.title as ShapeAttrs)?.fill)
            (styleConfig!.yAxis!.title!.style as ShapeAttrs).fill = mainText;
        //y轴-轴线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.line!.style as ShapeAttrs).stroke = supplementSecond;
        //y轴-网格线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.grid?.line?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.grid!.line!.style as ShapeAttrs).stroke = subText;
        //y轴-刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.tickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.tickLine!.style as ShapeAttrs).stroke = supplementFirst;
        //y轴-子刻度线
        if ((styleConfig?.yAxis) && (styleConfig?.yAxis?.subTickLine?.style as ShapeAttrs)?.stroke)
            (styleConfig!.yAxis!.subTickLine!.style as ShapeAttrs).stroke = subText;
        //重新渲染
        this.update({style: styleConfig} as any, {reRender: true});
    }
}