/**
 * 蓝图执行器
 * 说明：蓝图设计器中编辑的事件路径统一通过蓝图执行器进行执行，包括事件的触发、事件的执行、事件的终止等
 */
import bpStore from "../store/BPStore";
import {NodeType} from "../node/types";
import {AnchorPointType} from "../node/core/AbstractBPNodeController";

export interface BPTransportNode {
    nodeId: string;
    nodeType: NodeType;
    anchorId: string;
    anchorType: AnchorPointType;
}

export default class BPExecutor {

    private executeCount: number = 0;

    public static triggerComponentEvent(componentId: string, eventId: string, params: any): void {
        const anchorId = componentId + ":" + eventId + ":" + AnchorPointType.OUTPUT;
        const executor = new BPExecutor();
        executor.execute(anchorId, executor, params)
    }

    /**
     * 蓝图节点执行器，蓝图网络的执行入口
     * @param anchorId
     * @param executor
     * @param params
     */
    public execute(anchorId: string, executor: BPExecutor, params: any): void {
        //执行逻辑保护，一条路径执行的中间节点次数超过1000次，说明可能出现了死循环，直接终止
        if (executor.executeCount > 1000) {
            console.warn("蓝图执行器执行次数超过1000次，请检查是否出现死循环逻辑")
            return;
        }
        executor.executeCount++;

        if (!anchorId || anchorId === "")
            return;
        let anchorInfoArr = anchorId.split(":");
        if (anchorInfoArr.length !== 3)
            return;
        const {bpAPMap} = bpStore;
        const nextAnchorIds = bpAPMap[anchorId];
        if (!nextAnchorIds)
            return;
        //分发执行已链接的下一个节点
        nextAnchorIds.forEach((nextAnchorId: string) => {
            const [nodeId, anchorId, anchorType] = nextAnchorId.split(":");
            const {bpNodeControllerInsMap} = bpStore;
            const nodeController = bpNodeControllerInsMap[nodeId!];
            nodeController && nodeController.execute({
                nodeId,
                anchorId,
                anchorType: parseInt(anchorType) as AnchorPointType
            }, executor, params);
        });
    }
}