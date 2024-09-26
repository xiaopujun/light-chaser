import BPLayerNodeController from "./layer/BPLayerNodeController";
import {ClazzTemplate} from "../../../../../comps/common-component/CommonTypes.ts";
import BPConditionNodeController from "./condition/BPConditionNodeController";
import {AbstractBPNodeController} from "../AbstractBPNodeController";
import BPLogicalProcessNodeController from "./logical-process/BPLogicalProcessNodeController";
import BPSelectMultipleNodeController from "./select-multiple-node/BPSelectMultipleNodeController";

const bpNodeControllerMap = new Map<string, ClazzTemplate<AbstractBPNodeController>>();

bpNodeControllerMap.set('layer-node', BPLayerNodeController);
bpNodeControllerMap.set('condition-node', BPConditionNodeController);
bpNodeControllerMap.set('logical-process-node', BPLogicalProcessNodeController);
bpNodeControllerMap.set('select-multiple-node', BPSelectMultipleNodeController);

export default bpNodeControllerMap;
