import BPLayerNodeController from "./layer/BPLayerNodeController";
import {ClazzTemplate} from "../../../../comps/common-component/common-types";
import BPConditionNodeController from "./condition/BPConditionNodeController";
import {AbstractBPNodeController} from "../AbstractBPNodeController";
import BPLogicalProcessNodeController from "./logical-process/BPLogicalProcessNodeController";

const bpNodeControllerMap = new Map<string, ClazzTemplate<AbstractBPNodeController>>();

bpNodeControllerMap.set('layer-node', BPLayerNodeController);
bpNodeControllerMap.set('condition-node', BPConditionNodeController);
bpNodeControllerMap.set('logical-process-node', BPLogicalProcessNodeController);

export default bpNodeControllerMap;