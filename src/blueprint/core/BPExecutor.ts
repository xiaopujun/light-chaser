/**
 * 蓝图执行器
 * 说明：蓝图设计器中编辑的事件路径统一通过蓝图执行器进行执行，包括事件的触发、事件的执行、事件的终止等
 */
import bpStore from "../store/BPStore";
import nodeParserMap from "./parser";
import {NodeType} from "../node/types";
import {AnchorPointType} from "../node/core/AbstractBPNodeController";

export interface BPTransportNode {
    nodeId: string;
    nodeType: NodeType;
    anchorId: string;
    anchorType: AnchorPointType;
}

export default class BPExecutor {
    public static execute(anchorId: string, params: any): void {
        if (!anchorId || anchorId === "")
            return;
        let anchorInfoArr = anchorId.split("_");
        if (anchorInfoArr.length !== 4)
            return;
        const {bpAPMap} = bpStore;
        const nextAnchorIds = bpAPMap[anchorId];
        if (!nextAnchorIds)
            return;
        nextAnchorIds.forEach((nextAnchorId: string) => {
            const [nodeId, nodeType, anchorId, anchorType] = nextAnchorId.split("_");
            const nodeParser = nodeParserMap.get(parseInt(nodeType) as NodeType);
            nodeParser && nodeParser.doParse({
                nodeId,
                nodeType: parseInt(nodeType) as NodeType,
                anchorId,
                anchorType: parseInt(anchorType) as AnchorPointType
            }, params);
        });
    }
}