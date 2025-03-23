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

import AbstractManager from "./core/AbstractManager.ts";
import {action, makeObservable, observable} from "mobx";
import {DesignerMode, ProjectDataType} from "../DesignerType.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import layerManager from "./LayerManager.ts";
import themeManager from "../header/items/theme/ThemeManager.ts";
import bluePrintManager from "../blueprint/manager/BluePrintManager.ts";
import FilterManager from "./FilterManager.ts";

/**
 * 整个设计器的所有数据初始化和数据聚合，统一通过该管理器进行分发和处理
 */
class DesignerManager extends AbstractManager<ProjectDataType> {
    constructor() {
        super();
        makeObservable(this, {
            loaded: observable,
            setLoaded: action,
        })
    }

    loaded: boolean = false;

    setLoaded = (loaded: boolean) => this.loaded = loaded;

    destroy(): void {
        canvasManager.destroy();
        layerManager.destroy();
        themeManager.destroy();
        bluePrintManager.destroy();
    }

    getData(): ProjectDataType {
        return {
            canvasManager: canvasManager.getData(),
            themeManager: themeManager.getData()!,
            layerManager: layerManager.getData(),
            bluePrintManager: bluePrintManager.getData(),
            filterManager: FilterManager.getData(),
        };
    }

    init(data: ProjectDataType, mode: DesignerMode): void {
        data.canvasManager && canvasManager.init(data.canvasManager!);
        data.themeManager && themeManager.init(data.themeManager!);
        data.layerManager && layerManager.init(data.layerManager!);
        data.bluePrintManager && bluePrintManager.init(data.bluePrintManager!, mode)
        data.filterManager && FilterManager.init(data.filterManager!);
    }

}

const designerManager = new DesignerManager();
export default designerManager;