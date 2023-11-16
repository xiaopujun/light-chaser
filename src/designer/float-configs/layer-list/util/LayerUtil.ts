import designerStore from "../../../store/DesignerStore";
import {toJS} from "mobx";

export default class LayerUtil {

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
        const groupLayerIdSet = new Set();
        const {layoutConfigs} = designerStore;
        layerIds.forEach((id) => {
            let _id = id;
            let _pid = layoutConfigs[id]?.pid;
            while (_pid) {
                const {pid, id} = layoutConfigs[_pid];
                _pid = pid;
                _id = id;
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
        const layerIdSet = [];
        LayerUtil._findAllChildLayer(layerIds, layerIdSet);
        return [...new Set(layerIdSet)];
    }

    private static _findAllChildLayer(groupLayerIds: string[], res: string[]) {
        const {layoutConfigs} = designerStore;
        groupLayerIds.forEach((id) => {
            if (!layoutConfigs[id])
                console.log(toJS(layoutConfigs, id))
            let {childIds} = layoutConfigs[id];
            if (childIds && childIds.length > 0) {
                res.push(...childIds);
                LayerUtil._findAllChildLayer(childIds, res);
            }
            res.push(id);
        });
    }


    /**
     * @deprecated
     * 给定指定的图层id，向上查找其顶层的分组图层,没有分组的图层则返回自身
     * 例：A、B、C三个组件，A、B组成分组G1，C未分组。则传入A、B、C三个图层id，返回G1、C两个图层id
     * @param layerIds 待查找的图层id
     */
    public static findGroupLayer = (layerIds: string[]): string[] => {
        //使用set数据结构去重，多个不同的组件可能存在同一个分组内
        const groupLayerIdSet = new Set();
        const {layoutConfigs} = designerStore;
        console.log(toJS(layoutConfigs))
        layerIds.forEach((id) => {
            let _id = id;
            console.log("_id", _id)
            let _pid = layoutConfigs[_id].pid;
            while (_pid) {
                const {pid, id} = layoutConfigs[_pid];
                _pid = pid;
                _id = id;
            }
            //获取多选时最终的图层id，多个组件可能存在同一个分组内，所以需要去重
            groupLayerIdSet.add(_id);
        });
        return Array.from(groupLayerIdSet);
    }

    /**
     * //todo 废弃
     * @deprecated
     * @param layerIds
     */
    public static findChildLayer = (layerIds: string[]): string[] => {
        const layerIdSet = [];
        LayerUtil._findChildLayer(layerIds, layerIdSet);
        return [...new Set(layerIdSet)];
    }

    /**
     * todo 废弃
     * @param layerIds
     * @param res
     * @private
     */
    private static _findChildLayer(layerIds: string[], res: string[]) {
        layerIds.forEach((id) => {
            const {childIds} = designerStore.layoutConfigs[id];
            if (childIds && childIds.length > 0) {
                res.push(...[...childIds, id]);
                LayerUtil._findChildLayer(childIds, res);
            } else {
                res.push(id);
            }
        });
    }

    /**
     * todo 废弃
     * @deprecated
     * 排除掉分组图层id
     * @param layerIds
     */
    public static excludeGroupLayer = (layerIds: string[]): string[] => {
        const {layoutConfigs} = designerStore;
        return layerIds.filter(id => layoutConfigs[id].type !== 'group');
    }
}