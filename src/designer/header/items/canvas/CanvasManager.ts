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

import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import AbstractManager from "../../../manager/core/AbstractManager.ts";
import {CanvasConfig} from "../../../DesignerType.ts";

class CanvasManager extends AbstractManager<CanvasConfig> {

    constructor() {
        super();
        makeObservable(this, {
            canvasVisible: observable,
            canvasConfig: observable,
            setCanvasVisible: action,
            updateCanvasConfig: action,
        })
    }

    canvasVisible: boolean = false;

    setCanvasVisible = (visible: boolean) => this.canvasVisible = visible;

    canvasConfig: CanvasConfig = {
        rasterize: false, //是否栅格化
        dragStep: 1, //栅格化拖拽步长
        resizeStep: 1, //栅格化缩放步长
        width: 1920, //画布宽
        height: 1080, //画布高
        adaptationType: 'scale' //屏幕适配
    };

    updateCanvasConfig = (data: CanvasConfig) => this.canvasConfig = {...this.canvasConfig, ...data};

    public init(data: CanvasConfig): void {
        runInAction(() => {
            this.canvasConfig = data ? {...this.canvasConfig, ...data} : this.canvasConfig;
        })
    }

    public getData = (): CanvasConfig => {
        return toJS(this.canvasConfig!)
    }

    public destroy = () => {
        runInAction(() => {
            this.canvasConfig = {}
        });
    }

}

const canvasHdStore = new CanvasManager();
export default canvasHdStore;