import {AbstractBPNodeController} from "../../AbstractBPNodeController";
import {UpdateOptions} from "../../../../../../framework/core/AbstractController";
import ComponentUtil from "../../../../../../utils/ComponentUtil";
import BPNode, {NodeProps} from "../../../BPNode";
import React from "react";
import {AnchorPointType, NodeInfoType} from "../../../../../DesignerType.ts";
import {IBPTaskInfo} from "../../../../IBPTyps.ts";
import {ActionInfo} from "../../../../../../framework/core/AbstractDesignerDefinition.ts";
import DesignerManager from "../../../../../manager/DesignerManager.ts";
import editDesignerManager from "../../../../../manager/EditDesignerManager.ts";

export interface LayerNodeConfig extends NodeProps {

}

export default class BPLayerNodeController extends AbstractBPNodeController<LayerNodeConfig> {

    async create(container: HTMLElement, config: LayerNodeConfig): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BPNode, config);
    }

    execute(taskInfo: IBPTaskInfo, params: any): void {
        const {nodeId, apId, anchorType, layerManager} = taskInfo;
        if (anchorType === AnchorPointType.INPUT) {
            //输入点，执行动作
            //1.获取当前组件的控制器实例
            const {compController, layerConfigs} = layerManager;
            const compInstance = compController[nodeId];
            if (!compInstance)
                return;
            const {type} = layerConfigs[nodeId];
            const actionList = DesignerManager.definitionMap[type!].getActionList();
            //2.获取当前组件可执行的动作列表
            const action = actionList.find((action: ActionInfo) => action.id === apId);
            if (!action)
                return;
            //3.执行动作
            action.handler(compInstance, params);
        }
        //输出点不做处理，到达图层节点的输入类型锚点后不在向下继续查找执行
    }

    getConfig(): LayerNodeConfig | null {
        return this.config;
    }

    update(config: LayerNodeConfig, upOp: UpdateOptions | undefined): void {
    }

    getNodeInfo(nodeId: string): NodeInfoType | null {
        const {layerConfigs} = editDesignerManager.layerManager;
        const compLayout = layerConfigs[nodeId];
        const output = DesignerManager.definitionMap[compLayout.type!].getEventList().map((item) => {
            return {
                id: nodeId + ':' + item.id + ':' + AnchorPointType.OUTPUT,
                name: item.name,
                type: AnchorPointType.OUTPUT
            }
        });
        const input = DesignerManager.definitionMap[compLayout.type!].getActionList().map((item) => {
            return {
                id: nodeId + ':' + item.id + ':' + AnchorPointType.INPUT,
                name: item.name,
                type: AnchorPointType.INPUT
            }
        });
        return {
            id: nodeId,
            name: compLayout.name,
            icon: "CodeSandboxOutlined",
            type: 'BPLayerNode',
            titleBgColor: "#247057",
            input,
            output
        };
    }

    getConfigComponent(): React.ComponentType | null {
        return null;
    }

}