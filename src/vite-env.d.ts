/// <reference types="vite/client" />
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




import {DesignerMode, SaveType} from "./designer/DesignerType.ts";
import AbstractDesignerController from "./framework/core/AbstractDesignerController.ts";
import {AbstractDefinition} from "./framework/core/AbstractDefinition.ts";
import LayerManager from "./designer/manager/LayerManager.ts";
import BPExecutor from "./designer/blueprint/core/BPExecutor.ts";

declare global {
    interface Window {
        LC_ENV: {
            projectId?: string;
            mode?: DesignerMode;
            saveType?: SaveType;
            controllers?: Record<string, AbstractDesignerController>
            definitions?: Record<string, AbstractDefinition>;
            layerManager?: LayerManager;
            bpExecutor?: typeof BPExecutor;
            createdController?: number; //已渲染的组件数量
            totalController?: number; //组件总数量
            [key: string]: any;
        };
    }
}