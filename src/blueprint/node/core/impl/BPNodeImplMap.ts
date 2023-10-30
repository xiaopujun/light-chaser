import LayerNode from "./layer/LayerNode";
import ConditionNode from "./condition/ConditionNode";
import {AbstractNode} from "../AbstractNode";

const bPNodeImplMap = new Map<string, AbstractNode>();

bPNodeImplMap.set('layer-node', new LayerNode());
bPNodeImplMap.set('condition-node', new ConditionNode());

export default bPNodeImplMap;