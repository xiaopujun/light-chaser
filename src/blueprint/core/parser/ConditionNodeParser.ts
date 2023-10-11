import AbstractNodeParser from "./AbstractNodeParser";
import {BPTransportNode} from "../BPExecutor";

class ConditionNodeParser extends AbstractNodeParser {
    doParse(transportNode: BPTransportNode, params: any): void {
    }

}

const conditionNodeParser = new ConditionNodeParser();
export default conditionNodeParser;
