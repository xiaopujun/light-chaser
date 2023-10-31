import {AbstractBPNodeController, AnchorPointType, NodeInfoType} from "../../AbstractBPNodeController";
import {UpdateOptions} from "../../../../../framework/core/AbstractController";
import ComponentUtil from "../../../../../utils/ComponentUtil";
import BPNode, {NodeProps} from "../../../BPNode";
import designerStore from "../../../../../designer/store/DesignerStore";
import EditorDesignerLoader from "../../../../../designer/loader/EditorDesignerLoader";
import {NodeType} from "../../../types";
import React from "react";

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

    execute(params: any): void {
    }

    getConfig(): LayerNodeConfig | null {
        return this.config;
    }

    update(config: any, upOp: UpdateOptions | undefined): void {
    }

    getNodeInfo(nodeId: string): NodeInfoType | null {
        const {layoutConfigs} = designerStore;
        const compLayout = layoutConfigs[nodeId];
        const {customComponentInfoMap} = EditorDesignerLoader.getInstance();
        const output = customComponentInfoMap[compLayout.type!].getEventList().map((item) => {
            return {
                id: nodeId + '_' + NodeType.LAYER + '_' + item.id + '_' + AnchorPointType.OUTPUT,
                name: item.name,
                type: AnchorPointType.OUTPUT
            }
        });
        const input = customComponentInfoMap[compLayout.type!].getActionList().map((item) => {
            return {
                id: nodeId + '_' + NodeType.LAYER + '_' + item.id + '_' + AnchorPointType.INPUT,
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