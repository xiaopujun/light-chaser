import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableRoseOptions} from "../types";
import {Rose} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";

export interface AntdRoseProps extends ComponentBaseProps {
    style?: WritableRoseOptions;
}

export default class AntdCommonRoseController extends AntdBaseDesignerController<Rose, AntdRoseProps> {

    async create(container: HTMLElement, config: AntdRoseProps): Promise<void> {
        await super.commonCreate(container, Rose, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRoseProps | null {
        return this.config;
    }

    update(config: AntdRoseProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Rose, upOp);
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
        if ((styleConfig?.sectorStyle) && (styleConfig?.sectorStyle as ShapeAttrs))
            (styleConfig!.sectorStyle as ShapeAttrs).stroke = background;
        //标签
        if ((styleConfig?.label) && (styleConfig?.label?.style as ShapeAttrs))
            (styleConfig!.label!.style as ShapeAttrs).fill = mainText;
        //重新渲染
        this.update({style: styleConfig} as any, {reRender: true});
    }
}