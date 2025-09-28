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

import React, {ReactNode, useEffect} from "react";
import Moveable, {OnDrag, OnDragEnd, OnDragGroup, OnDragGroupEnd, OnDragStart} from "react-moveable";
import bluePrintManager from "../manager/BluePrintManager.ts";
import {observer} from "mobx-react";
import BpCanvasUtil from "../util/BpCanvasUtil.ts";

export interface BPMovableProps {
    children?: ReactNode;
}

export const BPMovable = observer((props: BPMovableProps) => {
        const {children} = props;
        const movableRef = React.createRef<Moveable>();

        useEffect(() => {
            const {setBpMovableRef} = bluePrintManager;
            setBpMovableRef(movableRef.current!);
        })

        const onDrag = (e: OnDrag) => {
            const {target, beforeTranslate} = e;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
            BpCanvasUtil.reRenderAllLine();
        }

        const onDragStart = (e: OnDragStart) => {
            const {inputEvent: {target}} = e;
            //点击锚点时禁止拖拽
            if (target.classList.contains('ap-circle'))
                return false;
        }

        const onDragEnd = (e: OnDragEnd) => {
            const {target, lastEvent} = e;
            //仅点击而不是拖拽则不处理
            if (!lastEvent) return;
            const {beforeTranslate} = lastEvent;
            const nodeId = target.id.split(':')[1];
            BpCanvasUtil.updNodeAndLinePos(nodeId, {x: beforeTranslate[0], y: beforeTranslate[1]});
        }

        const onDragGroup = (e: OnDragGroup) => {
            e.events.forEach((ev: OnDrag) => ev.target.style.transform = ev.transform);
            //重绘连线
            BpCanvasUtil.reRenderAllLine();
        }

        const onDragGroupEnd = (e: OnDragGroupEnd) => {
            e.events.forEach((ev: OnDragEnd) => {
                const {target, lastEvent} = ev;
                if (lastEvent) {
                    const nodeId = target.id.split(':')[1];
                    const {beforeTranslate} = lastEvent;
                    BpCanvasUtil.updNodeAndLinePos(nodeId, {x: beforeTranslate[0], y: beforeTranslate[1]});
                }
            })
        }

        const {selectedNodes} = bluePrintManager;
        return (
            <>
                {children}
                <Moveable ref={movableRef}
                          target={selectedNodes}
                          draggable={true}
                          origin={false}
                          hideDefaultLines={true}
                          onDragStart={onDragStart}
                          onDrag={onDrag}
                          onDragEnd={onDragEnd}
                          onDragGroup={onDragGroup}
                          onDragGroupEnd={onDragGroupEnd}
                />
            </>
        )
    }
)
