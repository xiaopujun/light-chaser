import LayerNodeController from "./layer/LayerNodeController";
import {ClazzTemplate} from "../../../../comps/common-component/common-types";
import ConditionNodeController from "./condition/ConditionNodeController";

const bpNodeControllerMap = new Map<string, ClazzTemplate<LayerNodeController>>();

bpNodeControllerMap.set('layer-node', LayerNodeController);
bpNodeControllerMap.set('condition-node', ConditionNodeController);

export default bpNodeControllerMap;