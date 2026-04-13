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

export interface DraggablePosition {
    x: number;
    y: number;
}

export interface DraggableAttachOptions {
    target: HTMLElement;
    handle?: HTMLElement;
}

export interface DraggableProviderConfig {
    enabled?: boolean;
    edgeGap?: number;
    ignoreSelector?: string;
    defaultPosition?: (target: HTMLElement) => DraggablePosition;
    onDragStart?: (position: DraggablePosition, event: PointerEvent) => void;
    onDragMove?: (position: DraggablePosition, event: PointerEvent) => void;
    onDragEnd?: (position: DraggablePosition, event: PointerEvent | null) => void;
    onPositionChange?: (position: DraggablePosition) => void;
}

interface DragSession {
    pointerId: number;
    startClientX: number;
    startClientY: number;
    originX: number;
    originY: number;
}

const DEFAULT_EDGE_GAP = 12;
const DEFAULT_IGNORE_SELECTOR = "button, input, textarea, select, option, a, [role='button'], [data-draggable-ignore='true'], [contenteditable='true']";

/**
 * 为任意 DOM 提供拖拽能力。
 * 通过 attach(target, handle) 挂载后，handle 上的 pointerdown 就会驱动 target 的位移。
 */
export default class DraggableProvider {
    private readonly config: DraggableProviderConfig;
    private target: HTMLElement | null = null;
    private handle: HTMLElement | null = null;
    private enabled: boolean;
    private position: DraggablePosition | null = null;
    private dragSession: DragSession | null = null;
    private resizeObserver: ResizeObserver | null = null;

    constructor(config: DraggableProviderConfig = {}) {
        this.config = config;
        this.enabled = config.enabled ?? true;
    }

    public attach(options: DraggableAttachOptions) {
        this.detach();

        this.target = options.target;
        this.handle = options.handle ?? options.target;
        this.ensureInitialPosition();

        this.handle.addEventListener("pointerdown", this.handlePointerDown);
        this.handle.addEventListener("pointermove", this.handlePointerMove);
        this.handle.addEventListener("pointerup", this.handlePointerUp);
        this.handle.addEventListener("pointercancel", this.handlePointerUp);
        this.handle.addEventListener("lostpointercapture", this.handleLostPointerCapture);
        window.addEventListener("resize", this.syncPosition);
        window.addEventListener("orientationchange", this.syncPosition);

        if (typeof ResizeObserver !== "undefined") {
            this.resizeObserver = new ResizeObserver(() => {
                this.syncPosition();
            });
            this.resizeObserver.observe(this.target);
        }
    }

    public setEnabled(enabled: boolean) {
        this.enabled = enabled;
        if (!enabled) {
            this.stopDragging(null, true);
        }
    }

    public setPosition(position: DraggablePosition) {
        this.position = this.clampPosition(position);
        this.applyPosition();
    }

    public getPosition() {
        return this.position;
    }

    public resetPosition() {
        if (!this.target) {
            return;
        }

        const nextPosition = this.resolveInitialPosition(this.target);
        this.setPosition(nextPosition);
    }

    public syncPosition = () => {
        if (!this.target) {
            return;
        }

        if (this.position == null) {
            this.ensureInitialPosition();
            return;
        }

        const nextPosition = this.clampPosition(this.position);
        if (nextPosition.x === this.position.x && nextPosition.y === this.position.y) {
            return;
        }

        this.position = nextPosition;
        this.applyPosition();
    };

    public destroy() {
        this.stopDragging(null, false);
        this.detach();
        this.target = null;
        this.handle = null;
        this.position = null;
    }

    private detach() {
        this.stopDragging(null, false);
        if (this.handle) {
            this.handle.removeEventListener("pointerdown", this.handlePointerDown);
            this.handle.removeEventListener("pointermove", this.handlePointerMove);
            this.handle.removeEventListener("pointerup", this.handlePointerUp);
            this.handle.removeEventListener("pointercancel", this.handlePointerUp);
            this.handle.removeEventListener("lostpointercapture", this.handleLostPointerCapture);
        }
        window.removeEventListener("resize", this.syncPosition);
        window.removeEventListener("orientationchange", this.syncPosition);
        this.resizeObserver?.disconnect();
        this.resizeObserver = null;
    }

    private ensureInitialPosition() {
        if (!this.target || this.position != null) {
            return;
        }

        this.position = this.clampPosition(this.resolveInitialPosition(this.target));
        this.applyPosition();
    }

    private resolveInitialPosition(target: HTMLElement): DraggablePosition {
        const defaultPosition = this.config.defaultPosition;
        if (defaultPosition) {
            return defaultPosition(target);
        }

        const edgeGap = this.config.edgeGap ?? DEFAULT_EDGE_GAP;
        return {
            x: edgeGap,
            y: edgeGap,
        };
    }

    private clampPosition(position: DraggablePosition): DraggablePosition {
        if (!this.target || typeof window === "undefined") {
            return position;
        }

        const edgeGap = this.config.edgeGap ?? DEFAULT_EDGE_GAP;
        const targetWidth = this.target.offsetWidth || this.target.getBoundingClientRect().width;
        const targetHeight = this.target.offsetHeight || this.target.getBoundingClientRect().height;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const maxX = Math.max(edgeGap, viewportWidth - targetWidth - edgeGap);
        const maxY = Math.max(edgeGap, viewportHeight - targetHeight - edgeGap);

        return {
            x: Math.min(Math.max(edgeGap, position.x), maxX),
            y: Math.min(Math.max(edgeGap, position.y), maxY),
        };
    }

    private applyPosition() {
        if (!this.target || !this.position) {
            return;
        }

        this.target.style.left = `${this.position.x}px`;
        this.target.style.top = `${this.position.y}px`;
        this.config.onPositionChange?.(this.position);
    }

    private isIgnoredTarget(eventTarget: EventTarget | null) {
        if (!(eventTarget instanceof Element)) {
            return false;
        }

        const ignoreSelector = this.config.ignoreSelector ?? DEFAULT_IGNORE_SELECTOR;
        return eventTarget.closest(ignoreSelector) != null;
    }

    private handlePointerDown = (event: PointerEvent) => {
        if (!this.enabled || !this.target || !this.handle) {
            return;
        }
        if (event.button !== 0 || this.isIgnoredTarget(event.target)) {
            return;
        }

        const currentPosition = this.position ?? this.resolveInitialPosition(this.target);
        this.position = this.clampPosition(currentPosition);
        this.applyPosition();

        this.dragSession = {
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startClientY: event.clientY,
            originX: this.position.x,
            originY: this.position.y,
        };

        try {
            this.handle.setPointerCapture(event.pointerId);
        } catch {
            // Some environments may not support pointer capture on the current target.
        }

        this.config.onDragStart?.(this.position, event);
        event.preventDefault();
    };

    private handlePointerMove = (event: PointerEvent) => {
        const session = this.dragSession;
        if (!session || event.pointerId !== session.pointerId || !this.enabled) {
            return;
        }

        event.preventDefault();

        const nextPosition = this.clampPosition({
            x: session.originX + (event.clientX - session.startClientX),
            y: session.originY + (event.clientY - session.startClientY),
        });

        this.position = nextPosition;
        this.applyPosition();
        this.config.onDragMove?.(nextPosition, event);
    };

    private handlePointerUp = (event: PointerEvent) => {
        if (!this.dragSession || event.pointerId !== this.dragSession.pointerId) {
            return;
        }

        this.stopDragging(event, true);
    };

    private handleLostPointerCapture = (event: Event) => {
        const pointerEvent = event as PointerEvent;
        if (!this.dragSession || pointerEvent.pointerId !== this.dragSession.pointerId) {
            return;
        }

        this.stopDragging(pointerEvent, true);
    };

    private stopDragging(event: PointerEvent | null, emitEnd: boolean) {
        const session = this.dragSession;
        if (!session) {
            return;
        }

        if (this.handle) {
            try {
                this.handle.releasePointerCapture(session.pointerId);
            } catch {
                // Ignore if capture was already released.
            }
        }

        this.dragSession = null;
        if (emitEnd) {
            this.config.onDragEnd?.(this.position ?? {x: 0, y: 0}, event);
        }
    }
}
