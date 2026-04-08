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

import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import {ComponentInfoType} from "../../common-component/CommonTypes.ts";
import BaseImageComponent, {BaseImageComponentStyle} from "./BaseImageComponent";
import ComponentUtil from "../../../utils/ComponentUtil";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import ObjectUtil from "../../../utils/ObjectUtil";
import {IFilterConfigType, ThemeItemType} from "../../../designer/DesignerType";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";

export interface BaseImageComponentProps {
    base?: ComponentInfoType;
    style?: BaseImageComponentStyle;
    filter?: IFilterConfigType;
}


export default class BaseImageController extends AbstractDesignerController<BaseImageComponent, BaseImageComponentProps> {

    public async create(container: HTMLElement, config: BaseImageComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<BaseImageComponent>(container, BaseImageComponent, config.style);
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseImageComponentProps | null {
        return this.config;
    }

    update(config: BaseImageComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender) {
            this.instance?.setState(this.config?.style!);
        }
    }

    updateTheme(newTheme: ThemeItemType): void {

    }

    registerEvent() {
        if (this.instance) {
            const nodeId = this.config?.base?.id!;
            this.instance.eventHandlerMap = {
                click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config)
            }
        }
    }
}