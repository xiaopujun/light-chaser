/**
 * 蓝图执行器
 * 说明：蓝图设计器中编辑的事件路径统一通过蓝图执行器进行执行，包括事件的触发、事件的执行、事件的终止等
 */
import bpStore from "../store/BPStore";
import {AnchorPointType} from "../node/core/AbstractBPNodeController";

export default class BPExecutor {

    /**
     * 单次逻辑链路执行次数统计，防止死循环
     */
    private executeCount: number = 0;

    /**
     * 触发组件事件
     * @param componentId 组件id
     * @param eventId 事件id
     * @param params 事件参数
     */
    public static triggerComponentEvent(componentId: string, eventId: string, params: any): void {
        const anchorId = componentId + ":" + eventId + ":" + AnchorPointType.OUTPUT;
        const executor = new BPExecutor();
        executor.execute(anchorId, executor, params)
    }

    /**
     * 蓝图节点执行器，蓝图网络的执行入口
     * @param apId 蓝图锚点id
     * @param executor 当前执行器
     * @param params 节点间传递的参数
     */
    public execute(apId: string, executor: BPExecutor, params: any): void {
        //执行逻辑保护，一条路径执行的中间节点次数超过1000次，说明可能出现了死循环，直接终止
        if (executor.executeCount > 1000) {
            console.warn("蓝图单条路径执行次数超过1000，请检查是否出现死循环逻辑！")
            return;
        }
        executor.executeCount++;

        if (!apId || apId === "")
            return;
        let anchorInfoArr = apId.split(":");
        if (anchorInfoArr.length !== 3)
            return;
        const {bpAPMap} = bpStore;
        const nextAnchorIds = bpAPMap[apId];
        if (!nextAnchorIds)
            return;
        //分发执行已链接的下一个节点
        nextAnchorIds.forEach((nextAnchorId: string) => {
            const [nodeId, apId, anchorType] = nextAnchorId.split(":");
            const {bpNodeControllerInsMap} = bpStore;
            const nodeController = bpNodeControllerInsMap[nodeId!];
            nodeController && nodeController.execute({
                nodeId, apId,
                anchorType: parseInt(anchorType) as AnchorPointType
            }, executor, params);
        });
    }
}