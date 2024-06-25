import {createElement, ReactElement} from "react";
import LayerItem from "./item/LayerItem";
import LayerGroupItem from "./item/LayerGroupItem";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {cloneDeep} from "lodash";
import layerListStore from "./LayerListStore";
import ComponentContainer from "../../../framework/core/ComponentContainer";
import {ILayerItem} from "../../DesignerType";
import GroupLayer from "../../../comps/group-layer/GroupLayer";
import LayerManager from "../../manager/LayerManager.ts";
import BPExecutor from "../../blueprint/core/BPExecutor.ts";

export enum LayerOrder {
    ASC,
    DESC,
}

class LayerBuilder {

    /**
     * 解析函数
     */
    public parser = (layerMap: Record<string, ILayerItem>, layerHeader: string, order: LayerOrder = LayerOrder.DESC): ILayerItem[] => {
        layerMap = cloneDeep(layerMap);
        let sourceLayerArr: ILayerItem[] = [];

        const iterateLayers = (currentLayer: ILayerItem, res: ILayerItem[]): void => {
            if (currentLayer) {
                res.push(currentLayer);
                if (currentLayer.childHeader) {
                    let childLayer = layerMap[currentLayer.childHeader];
                    iterateLayers(childLayer, res);
                }
                let next = currentLayer.next;
                while (next) {
                    const nextLayer = layerMap[next!];
                    if (nextLayer?.childHeader)
                        iterateLayers(layerMap[nextLayer.childHeader], res);
                    nextLayer && res.push(nextLayer);
                    next = nextLayer?.next;
                }
            }
        }

        iterateLayers(layerMap[layerHeader!], sourceLayerArr);

        if (order === LayerOrder.ASC)
            sourceLayerArr = sourceLayerArr.reverse();

        // 构建树结构
        const resData: ILayerItem[] = [];
        for (const layerItem of sourceLayerArr) {
            if (!layerItem?.pid) {
                // 根节点
                resData.push(layerItem);
            } else {
                // 非根节点，将其加入父节点的 children 中
                const parent = layerMap[layerItem.pid];
                if (parent) {
                    parent.children = parent.children || [];
                    parent.children.push(layerItem);
                }
            }
        }
        return resData;
    };


    /**
     * 构建图层组件
     */
    public buildLayerList = (layerMap: Record<string, ILayerItem>, layerHeader: string): ReactElement[] => {
        const res: ReactElement[] = [];
        this.parser(layerMap, layerHeader, LayerOrder.DESC).forEach((item: ILayerItem) => {
            res.push(this.buildLayer(item));
        });
        return res;
    }


    private buildLayer = (layer: ILayerItem): ReactElement => {
        const {type, children} = layer;
        const {targetIds} = eventOperateStore;
        const {layerInstances} = layerListStore;
        const _props = {
            name: layer.name,
            lock: layer.lock,
            hide: layer.hide,
            compId: layer.id,
            type: layer.type,
            selected: targetIds.includes(layer.id!)
        }
        if (type === 'group') {
            //先生成子元素再包裹groupItem
            const childDomArr: ReactElement[] = [];
            children?.forEach((item: ILayerItem) => {
                childDomArr.push(this.buildLayer(item));
            });
            return createElement(LayerGroupItem, {
                ..._props,
                key: layer.id,
                ref: (ref) => layerInstances[layer.id!] = ref!
            }, ...childDomArr);

        } else {
            //直接生成layerItem
            return createElement(LayerItem, {..._props, key: layer.id, ref: (ref) => layerInstances[layer.id!] = ref!});
        }
    }

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

const layerBuilder = new LayerBuilder();
export default layerBuilder;