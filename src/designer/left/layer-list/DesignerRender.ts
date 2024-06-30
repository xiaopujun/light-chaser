import {cloneDeep} from "lodash";
import {ILayerItem} from "../../DesignerType.ts";

export enum LayerOrder {
    ASC,
    DESC,
}


export default class DesignerRender {
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

}