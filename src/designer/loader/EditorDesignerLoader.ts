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
import {DesignerMode, ProjectDataType, SaveType} from "../DesignerType";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import layerManager from "../manager/LayerManager.ts";
import BPExecutor from "../blueprint/core/BPExecutor.ts";
import baseApi from "../../api/BaseApi.ts";

class EditorDesignerLoader extends AbstractDesignerLoader {

    protected async getProjectData(id: string): Promise<ProjectDataType | null> {
        const projectInfo = await baseApi.getProjectInfo(id);
        const {name, dataJson} = projectInfo!
        name && (document.title = name);
        return JSON.parse(dataJson!);
    }

    protected getProjectDataAfter(id: string, type: SaveType, data: ProjectDataType): void {
        designerManager.init(data, DesignerMode.EDIT);
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

const editorDesignerLoader = new EditorDesignerLoader();
export default editorDesignerLoader;