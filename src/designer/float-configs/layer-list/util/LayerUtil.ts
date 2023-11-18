import designerStore from "../../../store/DesignerStore";
import {toJS} from "mobx";

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
        const {layoutConfigs} = designerStore;
        layerIds.forEach((id) => {
            const layer = layoutConfigs[id];
            if (layer.type === 'group')
                groupLayerIdSet.add(id);
            let _pid = layer?.pid;
            while (_pid) {
                const {pid, id, type} = layoutConfigs[_pid];
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
        const {layoutConfigs} = designerStore;
        layerIds.forEach((id) => {
            let _id = id;
            let _pid = layoutConfigs[id]?.pid;
            while (_pid) {
                const {pid, id} = layoutConfigs[_pid];
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
     * 是否包含锁定图层通过参数控制。
     * 不包含隐藏图层
     * @param layerIds 分组图层ids
     */
    public static findAllChildLayer = (layerIds: string[]): string[] => {
        const layerIdArr: string[] = [];
        LayerUtil._findAllChildLayer(layerIds, layerIdArr);
        return [...new Set(layerIdArr)];
    }

    private static _findAllChildLayer(groupLayerIds: string[], res: string[]) {
        const {layoutConfigs} = designerStore;
        groupLayerIds.forEach((id) => {
            if (!layoutConfigs[id])
                console.log(toJS(layoutConfigs), id)
            let {childIds} = layoutConfigs[id];
            if (childIds && childIds.length > 0) {
                res.push(...childIds);
                LayerUtil._findAllChildLayer(childIds, res);
            }
            res.push(id);
        });
    }


    /**
     * 判断layerIds中的图层是否处于同一个图层 -- 用于判断是否可以进行图层编组
     * @param layerIds 图层id
     */
    public static hasSameGroup = (layerIds: string[]): boolean => {
        if (layerIds.length <= 1) return false;
        const {layoutConfigs} = designerStore;
        //如果layerIds中存在没有pid的图层，则说明这个图层一定没有编组，则直接返回false，说明本次可以编组
        if (layerIds.some((id) => layoutConfigs[id].type !== 'group' && !layoutConfigs[id].pid)) return false;
        const groupLayerIds = new Set();
        layerIds.filter((id) => layoutConfigs[id].type !== 'group').forEach((id) => {
            LayerUtil.findTopGroupLayer([id], true).forEach((id) => groupLayerIds.add(id));
        })
        //若所有图层向上查找分组后，只有一个结果返回，则说明所有图层处于同一个分组内
        return groupLayerIds.size === 1;
    }

}