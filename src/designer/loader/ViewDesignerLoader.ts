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

import designerManager from "../manager/DesignerManager.ts";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode, ProjectDataType, SaveType} from "../DesignerType";
import operatorMap from "../../framework/operate";
import layerManager from "../manager/LayerManager.ts";
import BPExecutor from "../blueprint/core/BPExecutor.ts";


/**
 * 展示模式下的设计器加载器
 */
class ViewDesignerLoader extends AbstractDesignerLoader {

    protected async getProjectData(id: string, type: SaveType): Promise<ProjectDataType | null> {
        return await operatorMap[type].getProjectData(id);
    }

    protected getProjectDataAfter(id: string, type: SaveType, data: ProjectDataType): void {
        designerManager.init(data, DesignerMode.VIEW);
        window.LC_ENV = {
            projectId: id,
            saveType: type,
            mode: DesignerMode.EDIT,
            createdController: 0,
            totalController: Object.keys(data.layerManager?.layerConfigs ?? []).length,
            controllers: layerManager.compController,
            definitions: this.definitionMap,
            bpExecutor: BPExecutor,
            layerManager: layerManager,
            ...window.LC_ENV
        }
    }
}

const viewDesignerLoader = new ViewDesignerLoader();
export default viewDesignerLoader;