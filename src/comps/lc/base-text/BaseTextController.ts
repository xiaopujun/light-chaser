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

import {DesignerMode} from "../../../designer/DesignerType";
import {UpdateOptions} from "../../../framework/core/AbstractController";
import AbstractDesignerController from "../../../framework/core/AbstractDesignerController";
import ComponentUtil from "../../../utils/ComponentUtil";
import BaseTextComponent, {BaseTextComponentProps, BaseTextComponentRef} from "./BaseTextComponent";
import ObjectUtil from "../../../utils/ObjectUtil";
import BPExecutor from "../../../designer/blueprint/core/BPExecutor";
import URLUtil from "../../../utils/URLUtil";

export class BaseTextController extends AbstractDesignerController<BaseTextComponentRef, BaseTextComponentProps> {

    async create(container: HTMLElement, config: BaseTextComponentProps): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender<BaseTextComponentRef>(container, BaseTextComponent, config);
        const {mode} = URLUtil.parseUrlParams();
        //基础文本在编辑模式下放开事件，以实现双击直接进入编辑状态
        if (mode === DesignerMode.EDIT)
            this.container!.style!.pointerEvents = "auto";
    }

    destroy(): void {
        this.instance = null;
        this.config = null;
    }

    getConfig(): BaseTextComponentProps | null {
        return this.config;
    }

    update(config: BaseTextComponentProps, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
        upOp = upOp || {reRender: true};
        if (upOp.reRender)
            this.instance?.updateConfig(this.config!);

    }


    registerEvent() {
        if (this.instance) {
            const nodeId = this.config?.base?.id ?? '';
            this.instance.setEventHandler({
                click: () => BPExecutor.triggerComponentEvent(nodeId!, "click", this.config)
            });
        }
    }

    changeData(data: any) {
        if (typeof data !== 'string') {
            console.error('数据类型错误, 基础文本仅接受字符串类型的数据: ', data);
            this.config!['data']!['staticData'] = "";
            return;
        }
        this.config!['data']!['staticData'] = data;
        this.instance?.updateConfig(this.config!);
    }
}