import {ComponentBaseProps} from "../../common-component/common-types";
import {WritablePieOptions} from "../../antd-common/types";
import {Pie, StatisticText} from "@antv/g2plot";
import {UpdateType, UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";
import {CSSProperties} from "react";

export interface AntdPieProps extends ComponentBaseProps {
    style?: WritablePieOptions;
}

export default class AntdPieController extends AntdBaseDesignerController<Pie, AntdPieProps> {

    async create(container: HTMLElement, config: AntdPieProps): Promise<this> {
        return super.commonCreate(container, Pie, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdPieProps | null {
        return this.config;
    }

    update(config: AntdPieProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Pie, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme) return;
        const styleConfig = this.config?.style!;
        const {colors: {main, mainText, supplementSecond, background, supplementFirst, subText}} = newTheme;
        //图形
        if (styleConfig?.color) {
            styleConfig.color = [main!, mainText!, subText!, supplementFirst!, supplementSecond!];
        }
        //图例
        if ((styleConfig.legend) && (styleConfig.legend.itemName?.style as ShapeAttrs)?.fill)
            (styleConfig!.legend!.itemName!.style as ShapeAttrs).fill = mainText;
        //描边
        if ((styleConfig?.pieStyle) && (styleConfig?.pieStyle as ShapeAttrs))
            (styleConfig!.pieStyle as ShapeAttrs).stroke = background;
        //标签
        if ((styleConfig?.label) && (styleConfig?.label?.style as ShapeAttrs))
            (styleConfig!.label!.style as ShapeAttrs).fill = mainText;
        //标题
        if ((styleConfig?.statistic) && (styleConfig?.statistic?.title) && (styleConfig.statistic.title as StatisticText).style)
            ((styleConfig!.statistic!.title as StatisticText).style as CSSProperties)!.color = mainText!;
        //内容
        if ((styleConfig?.statistic) && (styleConfig?.statistic?.content) && (styleConfig.statistic.content as StatisticText).style)
            ((styleConfig!.statistic!.content as StatisticText).style as CSSProperties)!.color = subText!;
        //重新渲染
        this.update({style: styleConfig} as any, {reRender: true, updateType: UpdateType.OPTIONS});
    }
}