import LayerNodeController from "./layer/LayerNodeController";
import {ClazzTemplate} from "../../../../comps/common-component/common-types";
import ConditionNodeController from "./condition/ConditionNodeController";
import {AbstractBPNodeController} from "../AbstractBPNodeController";

const bpNodeControllerMap = new Map<string, ClazzTemplate<AbstractBPNodeController>>();

bpNodeControllerMap.set('layer-node', LayerNodeController);
bpNodeControllerMap.set('condition-node', ConditionNodeController);

export default bpNodeControllerMap;