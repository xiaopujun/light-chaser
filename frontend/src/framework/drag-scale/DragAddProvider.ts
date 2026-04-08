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

export default class DragAddProvider {
    private readonly dragSource: HTMLElement | null = null;
    private readonly dragTarget: HTMLElement | null = null;
    private readonly dragStart: (e: DragEvent) => void;
    private readonly dragOver: (e: DragEvent) => void;
    private readonly drop: (e: DragEvent) => void;

    constructor(dragSource: HTMLElement,
                dragTarget: HTMLElement,
                dragStart: (e: DragEvent) => void,
                dragOver: (e: DragEvent) => void,
                drop: (e: DragEvent) => void) {
        if (!dragSource || !dragTarget)
            throw new Error("dragSource or dragTarget is null");
        this.dragSource = dragSource;
        this.dragTarget = dragTarget;
        this.dragStart = dragStart;
        this.dragOver = dragOver;
        this.drop = drop;

        // bind event
        this.dragStart && this.dragSource && this.dragSource.addEventListener('dragstart', this.dragStart);
        this.dragOver && this.dragTarget && this.dragTarget.addEventListener('dragover', this.dragOver);
        this.drop && this.dragTarget && this.dragTarget.addEventListener('drop', this.drop);
    }

    public destroy() {
        // unbind event
        this.dragStart && this.dragSource && this.dragSource.removeEventListener('dragstart', this.dragStart);
        this.dragOver && this.dragTarget && this.dragTarget.removeEventListener('dragover', this.dragOver);
        this.drop && this.dragTarget && this.dragTarget.removeEventListener('drop', this.drop);
    }

}