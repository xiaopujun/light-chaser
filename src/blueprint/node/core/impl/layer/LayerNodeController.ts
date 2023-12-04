import {AbstractBPNodeController, AnchorPointType, ExecuteInfoType, NodeInfoType} from "../../AbstractBPNodeController";
import {UpdateOptions} from "../../../../../framework/core/AbstractController";
import ComponentUtil from "../../../../../utils/ComponentUtil";
import BPNode, {NodeProps} from "../../../BPNode";
import designerStore from "../../../../../designer/store/DesignerStore";
import React from "react";
import {ActionInfo} from "../../../../../framework/core/AbstractDefinition";
import BPExecutor from "../../../../core/BPExecutor";
import DesignerLoaderFactory from "../../../../../designer/loader/DesignerLoaderFactory";

export interface LayerNodeConfig extends NodeProps {

}

export default class LayerNodeController extends AbstractBPNodeController<LayerNodeConfig> {

    async create(container: HTMLElement, config: LayerNodeConfig): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BPNode, config);
        return this;
    }

    destroy(): void {
    }

    execute(executeInfo: ExecuteInfoType, executor: BPExecutor, params: any): void {
        const {nodeId, apId, anchorType} = executeInfo;
        if (anchorType === AnchorPointType.INPUT) {
            //输入点，执行动作
            //1.获取当前组件的控制器实例
            const {compController, layerConfigs} = designerStore;
            const compInstance = compController[nodeId];
            if (!compInstance)
                return;
            const {type} = layerConfigs[nodeId];
            const {definitionMap} = DesignerLoaderFactory.getLoader();
            let actionList = definitionMap[type!].getActionList();
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

    update(config: any, upOp: UpdateOptions | undefined): void {
    }

    getNodeInfo(nodeId: string): NodeInfoType | null {
        const {layerConfigs} = designerStore;
        const compLayout = layerConfigs[nodeId];
        const {definitionMap} = DesignerLoaderFactory.getLoader();
        const output = definitionMap[compLayout.type!].getEventList().map((item) => {
            return {
                id: nodeId + ':' + item.id + ':' + AnchorPointType.OUTPUT,
                name: item.name,
                type: AnchorPointType.OUTPUT
            }
        });
        const input = definitionMap[compLayout.type!].getActionList().map((item) => {
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
            type: 'layer-node',
            titleBgColor: "#247057",
            input,
            output
        };
    }

    getConfigComponent(): React.ComponentType | null {
        return null;
    }

}