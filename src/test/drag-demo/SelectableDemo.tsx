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
import Selecto, {OnDragStart, OnSelectEnd} from "react-selecto";
import layerDemoStore from "./LayerDemoStore";
import {observer} from "mobx-react";

export interface BPSelectableProps {
    children?: React.ReactNode;
}

export const SelectableDemo: React.FC<BPSelectableProps> = observer((props) => {
    const {children} = props;
    const selectorRef = React.createRef<Selecto>();

    useEffect(() => {
        const {setSelectableRef} = layerDemoStore;
        setSelectableRef(selectorRef.current!);
    })


    const onSelectEnd = (e: OnSelectEnd) => {
        let {selected} = e;
        const {movableRef, setTargets} = layerDemoStore;
        selected = selected.filter((item) => item.classList.contains('selectable-demo-item'));
        //更新选中的组件
        setTargets(selected as HTMLElement[]);
        if (selected.length === 0) return;

        //如果为拖拽，则将当前的整个dom事件传递给movable，确保选中元素后可以立马拖拽
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            const tempTimer = setTimeout(() => {
                movableRef!.dragStart(e.inputEvent);
                clearTimeout(tempTimer);
            });
        }
    }

    const onDragStart = (e: OnDragStart) => {
        const {movableRef: movable, targets} = layerDemoStore;
        const target = e.inputEvent.target;
        if ((movable?.isMoveableElement(target))
            || targets.some((t: HTMLElement) => t === target || t.contains(target))
        ) {
            e.stop();
        }
    }

    return (
        <>
            {children}
            <Selecto ref={selectorRef}
                     dragContainer={".selectable-demo-container"}
                     selectableTargets={[".selectable-demo-item"]}
                     hitRate={0}
                     ratio={0}
                     selectByClick={true}
                     selectFromInside={false}
                     toggleContinueSelect={["ctrl"]}
                     onDragStart={onDragStart}
                     onSelectEnd={onSelectEnd}
            />
        </>
    )
})
