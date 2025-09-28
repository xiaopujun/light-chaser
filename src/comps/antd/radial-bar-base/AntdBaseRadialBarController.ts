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
import {WritableRadialBarOptions} from "../../antd-common/types";
import {RadialBar} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdRadialBarProps extends ComponentBaseProps {
    style?: WritableRadialBarOptions;
}

export default class AntdBaseRadialBarController extends AntdBaseDesignerController<RadialBar, AntdRadialBarProps> {

    async create(container: HTMLElement, config: AntdRadialBarProps): Promise<void> {
        super.commonCreate(container, RadialBar, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRadialBarProps | null {
        return this.config;
    }

    update(config: AntdRadialBarProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, RadialBar, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}