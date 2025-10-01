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

import {ComponentInfoType} from "../common-component/CommonTypes.ts";
import {UpdateOptions} from "../../framework/core/AbstractController";
import GroupLayer from "./GroupLayer";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController";

export interface GroupLayerProps {
    base: ComponentInfoType;
}

export default class GroupLayerController extends AbstractDesignerController<GroupLayer, GroupLayerProps> {

    constructor(container: HTMLElement, config: GroupLayerProps, instance: GroupLayer) {
        super();
        this.container = container;
        this.config = config;
        this.instance = instance;
    }

    async create(container: HTMLElement, config: GroupLayerProps): Promise<void> {
    }

    public getConfig(): GroupLayerProps | null {
        return this.config;
    }

    public update(config: GroupLayerProps, upOp: UpdateOptions | undefined): void {
    }

    setVisible(visible: boolean) {
        this.instance?.setState({load: visible})
    }
}