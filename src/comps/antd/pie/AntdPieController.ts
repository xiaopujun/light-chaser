/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import {WritablePieOptions} from "../../antd-common/types";
import {Pie, StatisticText} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";
import {ShapeAttrs} from "@antv/g-base";
import {CSSProperties} from "react";

export interface AntdPieProps extends ComponentBaseProps {
    style?: WritablePieOptions;
}

export default class AntdPieController extends AntdBaseDesignerController<Pie, AntdPieProps> {

    async create(container: HTMLElement, config: AntdPieProps): Promise<void> {
        super.commonCreate(container, Pie, config);
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
        this.update({style: styleConfig} as AntdPieProps, {reRender: true});
    }
}