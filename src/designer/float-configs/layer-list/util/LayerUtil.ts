import designerStore from "../../../store/DesignerStore";

export default class LayerUtil {
    /**
     * 给定指定的图层id，向上查找其顶层的分组图层,没有分组的图层则返回自身
     * 例：A、B、C三个组件，A、B组成分组G1，C未分组。则传入A、B、C三个图层id，返回G1、C两个图层id
     * @param layerIds 待查找的图层id
     */
    public static findGroupLayer = (layerIds: string[]): string[] => {
        //使用set数据结构去重，多个不同的组件可能存在同一个分组内
        const groupLayerIdSet = new Set();
        const {layoutConfigs} = designerStore;
        layerIds.forEach((id) => {
            let _id = id;
            let _pid = layoutConfigs[id].pid;
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
}