import LayerNodeController from "./layer/LayerNodeController";
import {ClazzTemplate} from "../../../../comps/common-component/common-types";
import ConditionNodeController from "./condition/ConditionNodeController";
import {AbstractBPNodeController} from "../AbstractBPNodeController";
import LogicalProcessNodeController from "./logical-process/LogicalProcessNodeController";

const bpNodeControllerMap = new Map<string, ClazzTemplate<AbstractBPNodeController>>();

bpNodeControllerMap.set('layer-node', LayerNodeController);
bpNodeControllerMap.set('condition-node', ConditionNodeController);
bpNodeControllerMap.set('logical-process-node', LogicalProcessNodeController);

export default bpNodeControllerMap;