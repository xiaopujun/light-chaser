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

import React, {useEffect} from "react";
import Moveable, {OnDrag, OnDragGroup, OnResize, OnResizeGroup} from "react-moveable";
import {observer} from "mobx-react";
import layerDemoStore from "./LayerDemoStore";

export interface BPMovableProps {
    children?: React.ReactNode;
}

export const MovableDemo = observer((props: BPMovableProps) => {
        const {children} = props;
        const movableRef = React.createRef<Moveable>();

        useEffect(() => {
            const {setMovableRef} = layerDemoStore;
            setMovableRef(movableRef.current!);
        })

        const onDrag = (e: OnDrag) => {
            const {target, beforeTranslate} = e;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }

        const onDragGroup = (e: OnDragGroup) => {
            e.events.forEach((ev: OnDrag) => ev.target.style.transform = ev.transform);
        }

        const onResize = (e: OnResize) => {
            const {target, width, height, drag} = e;
            target.style.width = `${width}px`;
            target.style.height = `${height}px`;
            target.style.transform = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
        }

        const onResizeGroup = (e: OnResizeGroup) => {
            e.events.forEach((ev: OnResize) => {
                ev.target.style.width = `${ev.width}px`;
                ev.target.style.height = `${ev.height}px`;
                ev.target.style.transform = ev.drag.transform;
            })
        }

        const {targets} = layerDemoStore;

        return (
            <>
                {children}
                <Moveable ref={movableRef}
                          target={targets}
                          draggable={true}
                          resizable={true}
                          warpable={true}
                          origin={false}
                          hideDefaultLines={false}
                          onDrag={onDrag}
                          onDragGroup={onDragGroup}
                          onResize={onResize}
                          onResizeGroup={onResizeGroup}
                          onWarp={e => {
                              e.target.style.transform = e.transform;
                          }}
                />
            </>
        )
    }
)
