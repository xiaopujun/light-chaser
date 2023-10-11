import {NodeType} from "../../node/types";
import AbstractNodeParser from "./AbstractNodeParser";
import layerNodeParser from "./LayerNodeParser";
import conditionNodeParser from "./ConditionNodeParser";

const nodeParserMap: Map<NodeType, AbstractNodeParser> = new Map();
nodeParserMap.set(NodeType.LAYER, layerNodeParser);
nodeParserMap.set(NodeType.CONDITION, conditionNodeParser);

export default nodeParserMap;