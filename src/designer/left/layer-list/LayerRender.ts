import {createElement, ReactElement} from "react";
import LayerItem from "./item/LayerItem";
import LayerGroupItem from "./item/LayerGroupItem";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import layerListStore from "./LayerListStore";
import {ILayerItem} from "../../DesignerType";
import DesignerRender, {LayerOrder} from "./DesignerRender.ts";


class LayerRender extends DesignerRender {

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
}

const layerRender = new LayerRender();
export default layerRender;