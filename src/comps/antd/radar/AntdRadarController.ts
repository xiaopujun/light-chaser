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
import {WritableRadarOptions} from "../../antd-common/types";
import {Radar} from "@antv/g2plot";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import {AntdBaseDesignerController} from "../../antd-common/AntdBaseDesignerController";
import {ThemeItemType} from "../../../designer/DesignerType";

export interface AntdRadarProps extends ComponentBaseProps {
    style?: WritableRadarOptions;
}

export default class AntdRadarController extends AntdBaseDesignerController<Radar, AntdRadarProps> {

    async create(container: HTMLElement, config: AntdRadarProps): Promise<void> {
        super.commonCreate(container, Radar, config);
    }

    destroy(): void {
        this.instance!.destroy();
        this.instance = null;
        this.config = null;
        this.interval && clearInterval(this.interval);
    }

    getConfig(): AntdRadarProps | null {
        return this.config;
    }

    changeData(data: any) {
        this.config!.data!.staticData = data;
        this.config!.style!.data = data;
        this.instance?.changeData(data);
    }


    update(config: AntdRadarProps, upOp?: UpdateOptions): void {
        super.commonUpdate(config, Radar, upOp);
    }

    updateTheme(newTheme: ThemeItemType): void {

    }
}