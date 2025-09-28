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
import * as G2Plot from "@antv/g2plot";
import {Plot} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import ObjectUtil from "../../../utils/ObjectUtil.ts";

export interface G2PlotCustomStyle {
    customCode: string;
}

export interface G2PlotCustomProps extends ComponentBaseProps {
    style?: G2PlotCustomStyle;
}

export default class G2PlotCustomController extends AntdBaseDesignerController<Plot<any>, G2PlotCustomProps> {

    async create(container: HTMLElement, config: G2PlotCustomProps): Promise<void> {
        this.container = container;
        this.config = config;
        const customCode = config.style?.customCode;
        if (!customCode || customCode === "")
            return;
        const func = eval(`(${customCode})`);
        if (typeof func !== 'function')
            return;
        this.instance = func(container, G2Plot, config.data?.staticData);
        //注册蓝图-暂不处理
        // this.registerEvent();
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): G2PlotCustomProps | null {
        return this.config;
    }


    changeData(data: any) {
        this.instance?.changeData(data);
    }

    update(config: G2PlotCustomProps, upOp?: UpdateOptions): void {
        //合并最新的配置
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender) {
            //销毁之前的图表实例
            try {
                this.instance?.destroy();
            } catch (e) {
                while (this.container?.firstChild) {
                    this.container.removeChild(this.container.firstChild);
                }
            }
            const customCode = config.style?.customCode;
            if (!customCode || customCode === "")
                return;
            const func = eval(`(${customCode})`);
            if (typeof func !== 'function')
                return;
            this.instance = func(this.container, G2Plot, this.config?.data?.staticData);
        }
    }

}