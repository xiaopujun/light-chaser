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

class BPLeftStore {
    constructor() {
        makeObservable(this, {
            activeMenu: observable,
            setActiveMenu: action,
            usedLayerNodes: observable,
            setUsedLayerNodes: action,
            searchValue: observable,
            setSearchValue: action,
        })
    }

    activeMenu = 'layer';

    usedLayerNodes: Record<string, boolean> = {};

    searchValue = '';

    setSearchValue = (value: string) => this.searchValue = value;

    setActiveMenu = (menu: string) => this.activeMenu = menu;

    setUsedLayerNodes = (node: string, used: boolean) => this.usedLayerNodes[node] = used;

    initUsedLayerNodes = (usedNodes: Record<string, boolean>) => this.usedLayerNodes = usedNodes;
}

const bpLeftStore = new BPLeftStore();
export default bpLeftStore;