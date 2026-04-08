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

class FooterStore {

    constructor() {
        makeObservable(this, {
            hotKeyVisible: observable,
            snapShotVisible: observable,
            configCodeVisible: observable,
            setHotKeyVisible: action,
            setSnapShotVisible: action,
            setConfigCodeVisible: action
        })
    }

    hotKeyVisible: boolean = false;

    snapShotVisible: boolean = false;

    configCodeVisible: boolean = false;

    setHotKeyVisible = (visible: boolean) => this.hotKeyVisible = visible;

    setSnapShotVisible = (visible: boolean) => this.snapShotVisible = visible;

    setConfigCodeVisible = (visible: boolean) => this.configCodeVisible = visible;

}

const footerStore = new FooterStore();
export default footerStore;