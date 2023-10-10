import {AnchorPointType, NodeProps} from "../BPNode";
import EditorDesignerLoader from "../../../designer/loader/EditorDesignerLoader";
import designerStore from "../../../designer/store/DesignerStore";

export class NodeFactory {
    public static createNode(type: string, id?: string): NodeProps {
        return nodeCreatorMap[type](id!);
    }
}

const createLayerNode = (id: string): NodeProps => {
    const {layoutConfigs} = designerStore;
    const compLayout = layoutConfigs[id];
    const {customComponentInfoMap} = EditorDesignerLoader.getInstance();
    const output = customComponentInfoMap[compLayout.type!].getEventList().map((item) => {
        return {
            id: item.id,
            name: item.name,
            type: AnchorPointType.OUTPUT
        }
    });
    const input = customComponentInfoMap[compLayout.type!].getActionList().map((item) => {
        return {
            id: item.id,
            name: item.name,
            type: AnchorPointType.INPUT
        }
    });
    return {id, name: compLayout.name, titleBgColor: "#247057", input, output};
}

const createLogicNode = (id: string): NodeProps => {
    return {
        id,
        name: "条件判断",
        titleBgColor: "#247ba6",
        input: [{
            id: "judge",
            name: "判断",
            type: AnchorPointType.INPUT
        }],
        output: [{
            id: "satisfy",
            name: "满足",
            type: AnchorPointType.OUTPUT
        }, {
            id: "unSatisfy",
            name: "不满足",
            type: AnchorPointType.OUTPUT
        }]
    };
}

const nodeCreatorMap: { [key: string]: Function } = {
    "layer": createLayerNode,
    "logical": createLogicNode
}

