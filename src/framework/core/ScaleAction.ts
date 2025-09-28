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

import AbstractScaleObserver from "./AbstractScaleObserver.ts";

export default class ScaleAction {

    public static xScale: number = 1;
    public static yScale: number = 1;

    public static observers: AbstractScaleObserver[] = [];

    public static doScale(xScale: number, yScale: number) {
        ScaleAction.xScale = xScale;
        ScaleAction.yScale = yScale;
        ScaleAction.observers.forEach(observer => observer.doScale(xScale, yScale));
    }

    public static add(observer: AbstractScaleObserver) {
        ScaleAction.observers.push(observer);
        if (ScaleAction.xScale !== 1 || ScaleAction.yScale !== 1) {
            observer.doScale(ScaleAction.xScale, ScaleAction.yScale);
        }
    }
}