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

import AMapComponent, {AMapComponentProps, AMapComponentRef} from "./AMapComponent.tsx";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController.ts";
import ComponentUtil from "../../utils/ComponentUtil.ts";
import ObjectUtil from "../../utils/ObjectUtil.ts";
import {UpdateOptions} from "../../framework/core/AbstractController.ts";
import BPExecutor from "../../designer/blueprint/core/BPExecutor.ts";

export class AMapController extends AbstractDesignerController<AMapComponentRef, AMapComponentProps> {

    async create(container: HTMLElement, config: AMapComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<AMapComponentRef>(container, AMapComponent, config);
        this.registerEvent();
        if (window.AMap) {
            if (window.AMap_Key)
                this.config!.style!.key = window.AMap_Key;
            if (window.AMap_securityJsCode)
                this.config!.style!.securityJsCode = window.AMap_securityJsCode;
        }
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): AMapComponentProps | null {
        return this.config;
    }

    update(config: AMapComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!);
    }


    registerEvent() {
        const nodeId = this.config?.base?.id!;
        this.instance?.setEventHandler({
            click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config),
        })
    }
}