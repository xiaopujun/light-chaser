import {ReactElement} from "react";
import LayerItem from "./item/LayerItem";
import LayerGroupItem from "./item/LayerGroupItem";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import {cloneDeep} from "lodash";
import layerListStore from "./LayerListStore";
import ComponentContainer from "../../../framework/core/ComponentContainer";
import {ILayerItem} from "../../DesignerType";
import GroupLayer from "../../../comps/group-layer/GroupLayer";

export enum RenderOrder {
    ASC,
    DESC,
}

class LayerBuilder {

    /**
     * 解析函数
     */
    public parser = (layerMap: Record<string, ILayerItem>, order: RenderOrder = RenderOrder.DESC): ILayerItem[] => {
        layerMap = cloneDeep(layerMap);
        let sourceLayerArr;
        if (order === RenderOrder.DESC)
            sourceLayerArr = Object.values(layerMap).sort((a, b) => b.order! - a.order!);
        else
            sourceLayerArr = Object.values(layerMap).sort((a, b) => a.order! - b.order!);
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
    public buildLayerList = (layerMap: Record<string, ILayerItem>): ReactElement[] => {
        const res: ReactElement[] = [];
        this.parser(layerMap, RenderOrder.DESC).forEach((item: ILayerItem) => {
            res.push(this.buildLayer(item));
        });
        return res;
    }


    private buildLayer = (layer: ILayerItem): ReactElement => {
        const {type, children} = layer;
        const {targetIds} = eventOperateStore;
        const {layerInstances} = layerListStore;
        let _props = {
            key: layer.id,
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
            return <LayerGroupItem {..._props} ref={ref => layerInstances[layer.id!] = ref!}>
                {childDomArr}
            </LayerGroupItem>;
        } else {
            //直接生成layerItem
            return <LayerItem {..._props} ref={ref => layerInstances[layer.id!] = ref!}/>;
        }
    }

    /**
     * 构建设计器主画布组件
     * @param layerMap
     */
    public buildCanvasComponents = (layerMap: Record<string, ILayerItem>): ReactElement[] => {
        const res: ReactElement[] = [];
        this.parser(layerMap, RenderOrder.ASC).forEach((item: ILayerItem) => {
            res.push(this.buildComponents(item));
        });
        return res;
    }

    private buildComponents = (layer: ILayerItem): ReactElement => {
        const {type, children} = layer;
        if (type === 'group') {
            //先生成子元素再包裹groupItem
            const childDomArr: ReactElement[] = [];
            children?.forEach((item: ILayerItem) => {
                childDomArr.push(this.buildComponents(item));
            });
            return <GroupLayer layer={layer} key={layer.id}>{childDomArr}</GroupLayer>;
        } else {
            return <ComponentContainer layer={layer} key={layer.id}/>;
        }
    }

}

const layerBuilder = new LayerBuilder();
export default layerBuilder;