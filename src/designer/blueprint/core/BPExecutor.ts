/**
 * 蓝图执行器
 * 说明：蓝图设计器中编辑的事件路径统一通过蓝图执行器进行执行，包括事件的触发、事件的执行、事件的终止等
 */
import BluePrintManager from "../manager/BluePrintManager.ts";
import {AnchorPointType} from "../node/core/AbstractBPNodeController";
import BPTask from "./BPTask.ts";
import LayerManager from "../../manager/LayerManager.ts";

export default class BPExecutor {

    private readonly bluePrintManager: BluePrintManager;
    private readonly layerManager: LayerManager;

    constructor(bluePrintManager: BluePrintManager, layerManager: LayerManager) {
        this.bluePrintManager = bluePrintManager;
        this.layerManager = layerManager;
    }

    /**
     * 触发组件事件
     * @param componentId 组件id
     * @param eventId 事件id
     * @param params 事件参数
     */
    public triggerComponentEvent(componentId: string, eventId: string, params: any): void {
        const anchorId = componentId + ":" + eventId + ":" + AnchorPointType.OUTPUT;
        const task = new BPTask();
        task.run(anchorId, task, this.bluePrintManager, this.layerManager, params)
    }

}