import React from "react";
import {ILayerItem} from "../../../designer/DesignerType";
import rightStore from "../../../designer/right/RightStore";

/**
 * 这个store不与mobx结合
 */
class BaseInfoStore {
    /**
     * 基础配置组件的实例引用
     */
    baseConfigRef: React.Component | null = null;

    setBaseConfigRef = (ref: React.Component | null) => this.baseConfigRef = ref;

    updateBaseConfig = (data: ILayerItem) => {
        const {activeElem: {id}} = rightStore;
        if (id !== data?.id) return;
        this.baseConfigRef?.setState(data);
    }

}

const baseInfoStore = new BaseInfoStore();
export default baseInfoStore;