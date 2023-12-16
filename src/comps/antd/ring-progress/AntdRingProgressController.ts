import {ComponentBaseProps} from "../../common-component/common-types";
import {WritableRingProgressOptions} from "../../antd-common/types";
import {RingProgress, StatisticText} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {CSSProperties} from "react";

export interface AntdRingProgressProps extends ComponentBaseProps {
    style?: WritableRingProgressOptions;
}

export default class AntdRingProgressController extends AntdBaseDesignerController<RingProgress, AntdRingProgressProps> {

    async create(container: HTMLElement, config: AntdRingProgressProps): Promise<void> {
        await super.commonCreate(container, RingProgress, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRingProgressProps | null {
        return this.config;
    }

    update(config: AntdRingProgressProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, RingProgress, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {
        if (!newTheme) return;
        const styleConfig = this.config?.style!;
        const {colors: {main, mainText, supplementFirst, subText}} = newTheme;
        //图形
        if (styleConfig?.color) {
            styleConfig.color = [main!, supplementFirst!];
        }
        //标题
        if ((styleConfig?.statistic) && (styleConfig?.statistic?.title) && (styleConfig.statistic.title as StatisticText).style)
            ((styleConfig!.statistic!.title as StatisticText).style as CSSProperties)!.color = mainText!;
        //内容
        if ((styleConfig?.statistic) && (styleConfig?.statistic?.content) && (styleConfig.statistic.content as StatisticText).style)
            ((styleConfig!.statistic!.content as StatisticText).style as CSSProperties)!.color = subText!;
        //重新渲染
        this.update({style: styleConfig} as any, {reRender: true});
    }
}