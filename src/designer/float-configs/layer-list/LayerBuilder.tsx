import {MovableItemType} from "../../operate-provider/movable/types";

export default class LayerBuilder {
    /**
     * 原始图层信息，取自于设计器store
     */
    private sourceLayer: MovableItemType | null = null;

    /**
     * 将原始图层信息解析为树结构
     */
    private layerTree: any | null = null;

    /**
     * 解析函数
     */
    public parser: (layer: MovableItemType) => {};


    /**
     * 构建图层组件
     */
    public build = (layer: MovableItemType) => {
        
    }


}