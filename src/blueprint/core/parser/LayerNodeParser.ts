import AbstractNodeParser from "./AbstractNodeParser";
import {BPTransportNode} from "../BPExecutor";
import {AnchorPointType} from "../../node/BPNode";
import designerStore from "../../../designer/store/DesignerStore";
import EditorDesignerLoader from "../../../designer/loader/EditorDesignerLoader";
import {ActionInfo} from "../../../framework/core/AbstractComponentDefinition";

class LayerNodeParser extends AbstractNodeParser {
    doParse(transportNode: BPTransportNode, params: any): void {
        const {nodeId, anchorId, anchorType} = transportNode;
        if (anchorType === AnchorPointType.INPUT) {
            //输入点，执行动作
            //1.获取当前组件的控制器实例
            const {compInstances, layoutConfigs} = designerStore;
            const compInstance = compInstances[nodeId];
            if (!compInstance)
                return;
            const {type} = layoutConfigs[nodeId];
            const {customComponentInfoMap} = EditorDesignerLoader.getInstance();
            let actionList = customComponentInfoMap[type!].getActionList();
            //2.获取当前组件可执行的动作列表
            const action = actionList.find((action: ActionInfo) => action.id === anchorId);
            if (!action)
                return;
            //3.执行动作
            action.handler(compInstance, params);
        }
        //输出点不做处理，事件只能由组件触发，不能在蓝图路径中触发
    }
}

const layerNodeParser = new LayerNodeParser();
export default layerNodeParser;