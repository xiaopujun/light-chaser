import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import {WritableWordCloudOptions} from "../../antd-common/types";
import {WordCloud} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";

export interface AntdWordCloudProps extends ComponentBaseProps {
    style?: WritableWordCloudOptions;
}

export default class AntdWordCloudController extends AntdBaseDesignerController<WordCloud, AntdWordCloudProps> {

    async create(container: HTMLElement, config: AntdWordCloudProps): Promise<void> {
        super.commonCreate(container, WordCloud, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdWordCloudProps | null {
        return this.config;
    }

    update(config: AntdWordCloudProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, WordCloud, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme) return;
        const styleConfig = this.config?.style!;
        const {colors: {main, mainText, supplementSecond, supplementFirst, subText}} = newTheme;
        //图形
        if (styleConfig?.color) {
            styleConfig.color = [main!, mainText!, subText!, supplementFirst!, supplementSecond!];
        }
        //图例
        if ((styleConfig.legend) && (styleConfig.legend.itemName?.style as ShapeAttrs)?.fill)
            (styleConfig!.legend!.itemName!.style as ShapeAttrs).fill = mainText;
        if ((styleConfig?.label) && (styleConfig?.label?.style as ShapeAttrs))
            (styleConfig!.label!.style as ShapeAttrs).fill = mainText;
        //重新渲染
        this.update({style: styleConfig} as AntdWordCloudProps, {reRender: true});
    }
}