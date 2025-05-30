/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {action, makeObservable, observable} from "mobx";
import {BaseInfoType} from "../../../framework/core/AbstractDefinition";
import editorDesignerLoader from "../../loader/EditorDesignerLoader.ts";

class ComponentListStore {
    constructor() {
        makeObservable(this, {
            categories: observable,
            subCategories: observable,
            search: observable,
            setCategories: action,
            setSubCategories: action,
            setSearch: action,
        })
    }

    /**
     * 组件基础信息数组。设计器左侧组件列表的展示过滤依赖于此数组。
     * 该数组会在设计器加载时进行初始化，后续不再修改。若其他。 场景或组件需要。 操作该数组的数据。 应该操作他的备份。 而不是直接操作该数组。
     */
    compInfoArr: Array<BaseInfoType> = [];

    categories: string = "all";

    subCategories: string = "all";

    search: string = "";

    setCategories = (categories: string) => this.categories = categories;

    setSubCategories = (subCategories: string) => this.subCategories = subCategories;

    setSearch = (search: string) => this.search = search;

    doInit = () => {
        const comps: Array<BaseInfoType> = [];
        const {definitionMap} = editorDesignerLoader;
        if (definitionMap) {
            Object.keys(definitionMap).forEach(key => {
                const baseInfo = definitionMap[key].getBaseInfo();
                if (baseInfo.compKey !== 'group') comps.push(baseInfo);
            });
        }
        this.compInfoArr = comps;
    }

}

const componentListStore = new ComponentListStore();
export default componentListStore;
