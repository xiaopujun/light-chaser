import {AbstractNode, AnchorPointType, NodeInfoType} from "../../AbstractNode";
import {LayerNodeConfig} from "./LayerNodeConfig";
import React from "react";
import designerStore from "../../../../../designer/store/DesignerStore";
import EditorDesignerLoader from "../../../../../designer/loader/EditorDesignerLoader";
import {NodeType} from "../../../types";

export interface LayerNodeConfigType {

}

export default class LayerNode extends AbstractNode<LayerNodeConfigType> {
    public getNodeInfo(compId: any): NodeInfoType {
        const {layoutConfigs} = designerStore;
        const compLayout = layoutConfigs[compId];
        const {customComponentInfoMap} = EditorDesignerLoader.getInstance();
        const output = customComponentInfoMap[compLayout.type!].getEventList().map((item) => {
            return {
                id: compId + '_' + NodeType.LAYER + '_' + item.id + '_' + AnchorPointType.OUTPUT,
                name: item.name,
                type: AnchorPointType.OUTPUT
            }
        });
        const input = customComponentInfoMap[compLayout.type!].getActionList().map((item) => {
            return {
                id: compId + '_' + NodeType.LAYER + '_' + item.id + '_' + AnchorPointType.INPUT,
                name: item.name,
                type: AnchorPointType.INPUT
            }
        });
        return {id: compId, name: compLayout.name, type: 'layer', titleBgColor: "#247057", input, output};
    }

    execute(params: any): void {
    }

    getConfigComponent(): React.ReactNode {
        return LayerNodeConfig;
    }

    updateConfig(params: LayerNodeConfigType): void {
    }
}