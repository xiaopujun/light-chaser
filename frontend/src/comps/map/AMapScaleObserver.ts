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

import AbstractScaleObserver from "../../framework/core/AbstractScaleObserver.ts";
import ScaleAction from "../../framework/core/ScaleAction.ts";

export default class AMapScaleObserver extends AbstractScaleObserver {

    mapDom: HTMLDivElement | null = null;
    observer: ResizeObserver | null = null;

    constructor(mapDom: HTMLDivElement | null) {
        super();
        this.mapDom = mapDom;
        this.mapDom!.style.transformOrigin = '0 0'
        ScaleAction.add(this)
    }

    doScale(xScale: number, yScale: number): void {
        this.mapDom!.style.transform = `scale(${1 / xScale},${1 / yScale})`
        this.observer = new ResizeObserver((entries, observer) => {
            entries.forEach((entry) => {
                const {width, height} = entry.contentRect;
                this.mapDom!.style.width = width * xScale + 'px';
                this.mapDom!.style.height = height * yScale + 'px';
            });
        });
        this.observer.observe(this.mapDom!.parentElement!)
    }

    destroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}