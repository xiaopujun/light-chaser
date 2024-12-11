/// <reference types="vite/client" />


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