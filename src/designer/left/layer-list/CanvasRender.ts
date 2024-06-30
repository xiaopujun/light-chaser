import DesignerRender, {LayerOrder} from "./DesignerRender.ts";
import LayerManager from "../../manager/LayerManager.ts";
import BPExecutor from "../../blueprint/core/BPExecutor.ts";
import {ILayerItem} from "../../DesignerType.ts";
import GroupLayer from "../../../comps/group-layer/GroupLayer.tsx";
import ComponentContainer from "../../../framework/core/ComponentContainer.tsx";
import {createElement, ReactElement} from "react";

class CanvasRender extends DesignerRender {

    private order: number = 1;

    /**
     * 构建设计器主画布组件
     * @param layerManager 图层管理器
     * @param bpExecutor 蓝图执行器
     * @param triggerSource 触发源，来源为编辑模式下触发、预览模式下触发，引用大屏组件触发。（通过大屏组件执行的渲染，渲染的组件不能被选中）
     */
    public buildCanvasComponents = (layerManager: LayerManager, bpExecutor: BPExecutor, triggerSource?: string): ReactElement[] => {
        const res: ReactElement[] = [];
        this.parser(layerManager.layerConfigs, layerManager.layerHeader!, LayerOrder.ASC).forEach((item: ILayerItem) => {
            res.push(this.buildComponents(item, layerManager, bpExecutor, triggerSource));
        });
        //重置排序编号
        this.order = 1;
        return res;
    }

    private buildComponents = (layer: ILayerItem, layerManager: LayerManager, bpExecutor: BPExecutor, triggerSource?: string): ReactElement => {
        const {type, children} = layer;
        const targetLayer = layerManager.layerConfigs[layer.id!];
        //给每个图层重新设置排序编号,用于在图层移动的过程中提供更好的体验
        if (targetLayer)
            targetLayer.order = this.order++;
        if (type === 'group') {
            //先生成子元素再包裹groupItem
            const childDomArr: ReactElement[] = [];
            children?.forEach((item: ILayerItem) => {
                childDomArr.push(this.buildComponents(item, layerManager, bpExecutor, triggerSource));
            });
            return createElement(GroupLayer, {layer, layerManager, key: layer.id}, ...childDomArr)
        } else {
            return createElement(ComponentContainer, {
                layer,
                layerManager,
                bpExecutor,
                key: layer.id,
                triggerSource: triggerSource
            });
        }
    }
}

const canvasRender = new CanvasRender();
export default canvasRender;

