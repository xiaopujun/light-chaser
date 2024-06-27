import {AnchorPointType} from "../DesignerType.ts";
import BluePrintManager from "./manager/BluePrintManager.ts";
import LayerManager from "../manager/LayerManager.ts";
import BPTask from "./core/BPTask.ts";

export interface IBPTaskInfo {
    apId: string;
    nodeId: string;
    anchorType: AnchorPointType;
    task: BPTask;
    bluePrintManager: BluePrintManager;
    layerManager: LayerManager;
}
