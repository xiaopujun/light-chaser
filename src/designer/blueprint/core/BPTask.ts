import BluePrintManager from "../manager/BluePrintManager.ts";
import {AnchorPointType} from "../node/core/AbstractBPNodeController.ts";
import LayerManager from "../../manager/LayerManager.ts";

export default class BPTask {
    /**
     * 单次逻辑链路执行次数统计，防止死循环
     */
    private executeCount: number = 0;

    /**
     * 蓝图节点执行器，蓝图网络的执行入口
     * @param apId 蓝图锚点id
     * @param task 当前执行器
     * @param bluePrintManager 当前蓝图管理器
     * @param layerManager 当前图层管理器
     * @param params 节点间传递的参数
     */
    public run(apId: string, task: BPTask, bluePrintManager: BluePrintManager, layerManager: LayerManager, params: any): void {
        //执行逻辑保护，一条路径执行的中间节点次数超过1000次，说明可能出现了死循环，直接终止
        if (task.executeCount > 10000) {
            console.warn("蓝图单条路径执行次数超过1000，请检查是否出现死循环逻辑！")
            return;
        }
        task.executeCount++;

        if (!apId || apId === "")
            return;
        const anchorInfoArr = apId.split(":");
        if (anchorInfoArr.length !== 3)
            return;
        const {bpAPMap} = bluePrintManager;
        const nextAnchorIds = bpAPMap[apId];
        if (!nextAnchorIds)
            return;
        //分发执行已链接的下一个节点
        nextAnchorIds.forEach((nextAnchorId: string) => {
            const [nodeId, apId, anchorType] = nextAnchorId.split(":");
            const {bpNodeControllerInsMap} = bluePrintManager;
            const nodeController = bpNodeControllerInsMap[nodeId!];
            nodeController && nodeController.execute({
                apId,
                nodeId,
                anchorType: parseInt(anchorType) as AnchorPointType,
                task: task,
                bluePrintManager,
                layerManager
            }, params);
        });
    }
}