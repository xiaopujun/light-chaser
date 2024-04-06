import layerManager from "../../../manager/LayerManager.ts";
import {ILayerItem} from "../../../DesignerType.ts";

export default class LayerUtil {

    /**
     * 查找图层上层路径的所有分组图层，比如
     * |A
     * |-B
     * |--C
     * 传入C的id，返回[A,B]，未找到则返回空数组
     * @param layerIds
     */
    public static findPathGroupLayer = (layerIds: string[]): string[] => {
        const groupLayerIdSet = new Set<string>();
        const {layerConfigs} = layerManager;
        layerIds.forEach((id) => {
            const layer = layerConfigs[id];
            if (layer.type === 'group')
                groupLayerIdSet.add(id);
            let _pid = layer?.pid;
            while (_pid) {
                const {pid, id, type} = layerConfigs[_pid];
                _pid = pid;
                if (type === 'group')
                    groupLayerIdSet.add(id!);
            }
        });
        return Array.from(groupLayerIdSet);
    }

    /**
     * 查找layerIds对应的图层中最顶层的分组图层，例如：
     * |A
     * |-B
     * |--C
     * 传入C的id，返回A的id，未找到则返回空数组
     * @param layerIds 普通图层id
     * @param hasSelf 没有找到分组图层时，是否返回自身id
     */
    public static findTopGroupLayer = (layerIds: string[], hasSelf: boolean = false): string[] => {
        //使用set数据结构去重，多个不同的组件可能存在同一个分组内
        const groupLayerIdSet = new Set<string>();
        const {layerConfigs} = layerManager;
        layerIds.forEach((id) => {
            let _id = id;
            let _pid = layerConfigs[id]?.pid;
            while (_pid) {
                const {pid, id} = layerConfigs[_pid];
                _pid = pid;
                _id = id!;
            }
            if (hasSelf || _id !== id)
                groupLayerIdSet.add(_id);
        });
        return Array.from(groupLayerIdSet);
    }

    /**
     * 通过一个子图层id，查询其所在的分组下所有子图层id，包括分组图层本身id
     * @param layerIds
     * @param hasSelf 没有找到分组图层时，是否返回自身id
     */
    public static findAllChildLayerBySubId = (layerIds: string[], hasSelf: boolean = false): string[] => {
        const topGroupId = LayerUtil.findTopGroupLayer(layerIds, hasSelf);
        return LayerUtil.findAllChildLayer(topGroupId);
    }

    /**
     * 查找分组图层下的所有子图层id，包括分组图层本身id.
     * @param  分组图层ids
     * @param hasSelf 是否包含自身id
     */
    public static findAllChildLayer = (groupIds: string[], hasSelf: boolean = true): string[] => {
        let layerIdArr: string[] = [];
        const {layerConfigs} = layerManager;
        groupIds.forEach((id) => {
            layerIdArr.push(id);
            let layer: ILayerItem = layerConfigs[id];
            if (layer.childHeader)
                LayerUtil.iterateLayerLink(layer.childHeader, layerIdArr);
        });
        if (!hasSelf)
            layerIdArr = layerIdArr.filter((id) => !groupIds.includes(id));
        return [...new Set(layerIdArr)];
    }

    /**
     * 递归向下查找所有子图层id
     * @param layerHeader 分组图层ids
     * @param res 结果数组
     * @private
     */
    public static iterateLayerLink(layerHeader: string, res: string[]) {
        const {layerConfigs} = layerManager;
        let layer: ILayerItem = layerConfigs[layerHeader];
        if (layer) {
            res.push(layer.id!);
            if (layer.childHeader)
                LayerUtil.iterateLayerLink(layer.childHeader, res);
            let nextLayer = layerConfigs[layer.next!];
            while (nextLayer) {
                if (nextLayer.childHeader)
                    LayerUtil.iterateLayerLink(nextLayer.childHeader, res);
                res.push(nextLayer.id!);
                nextLayer = layerConfigs[nextLayer.next!];
            }
        }
    }


    /**
     * 判断layerIds中的图层是否已经处于同一个分组下 -- 用于判断是否可以进行图层编组
     * @param layerIds 图层id
     */
    public static hasSameGroup = (layerIds: string[]): boolean => {
        if (layerIds.length <= 1) return false;
        const {layerConfigs} = layerManager;
        //如果layerIds中存在没有pid的图层，则说明这个图层一定没有编组，则直接返回false，说明本次可以编组
        if (layerIds.some((id) => layerConfigs[id].type !== 'group' && !layerConfigs[id].pid)) return false;
        const groupLayerIds = new Set();
        layerIds.filter((id) => layerConfigs[id].type !== 'group').forEach((id) => {
            LayerUtil.findTopGroupLayer([id], true).forEach((id) => groupLayerIds.add(id));
        })
        //若所有图层向上查找分组后，只有一个结果返回，则说明所有图层处于同一个分组内
        return groupLayerIds.size === 1;
    }

}