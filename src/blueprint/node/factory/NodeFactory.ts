import {NodeProps} from "../BPNode";
import bPNodeImplMap from "../core/impl/BPNodeImplMap";

export class NodeFactory {
    public static createNode(type: string, id?: string): NodeProps | null {
        let bpNodeImpl = bPNodeImplMap.get(type);
        if (!bpNodeImpl)
            return null;
        return bpNodeImpl.getNodeInfo(id);
    }
}

/**
 * 创建图层节点对象
 * @param compId 组件id
 */
// const createLayerNode = (compId: string): NodeProps => {
//     const {layoutConfigs} = designerStore;
//     const compLayout = layoutConfigs[compId];
//     const {customComponentInfoMap} = EditorDesignerLoader.getInstance();
//     const output = customComponentInfoMap[compLayout.type!].getEventList().map((item) => {
//         return {
//             id: compId + '_' + NodeType.LAYER + '_' + item.id + '_' + AnchorPointType.OUTPUT,
//             name: item.name,
//             type: AnchorPointType.OUTPUT
//         }
//     });
//     const input = customComponentInfoMap[compLayout.type!].getActionList().map((item) => {
//         return {
//             id: compId + '_' + NodeType.LAYER + '_' + item.id + '_' + AnchorPointType.INPUT,
//             name: item.name,
//             type: AnchorPointType.INPUT
//         }
//     });
//     return {id: compId, name: compLayout.name, type: 'layer', titleBgColor: "#247057", input, output};
// }
//
// const createLogicNode = (): NodeProps => {
//     const id = idGenerate.generateId();
//     return {
//         id,
//         name: "条件判断",
//         titleBgColor: "#247ba6",
//         type: "logical",
//         input: [{
//             id: id + '_' + NodeType.CONDITION + '_judge_' + AnchorPointType.INPUT,
//             name: "判断",
//             type: AnchorPointType.INPUT
//         }],
//         output: [{
//             id: id + "_" + NodeType.CONDITION + "_satisfy_" + AnchorPointType.OUTPUT,
//             name: "满足",
//             type: AnchorPointType.OUTPUT
//         }, {
//             id: id + '_' + NodeType.CONDITION + '_unSatisfy_' + AnchorPointType.OUTPUT,
//             name: "不满足",
//             type: AnchorPointType.OUTPUT
//         }]
//     };
// }
//
// const nodeCreatorMap: { [key: string]: Function } = {
//     "layer": createLayerNode,
//     "logical": createLogicNode
// }

