import React, {useEffect} from "react";
import Selecto, {OnDragStart, OnSelectEnd} from "react-selecto";
import bpStore from "../store/BPStore";

export interface BPSelectableProps {
    children?: React.ReactNode;
}

export const BPSelectable: React.FC<BPSelectableProps> = (props) => {
    const {children} = props;
    const selectorRef = React.createRef<Selecto>();

    useEffect(() => {
        const {setBpSelectRef} = bpStore;
        setBpSelectRef(selectorRef.current!);
    })

    const onDragStart = (e: OnDragStart) => {
        const {bpMovableRef, selectedNodes} = bpStore;
        const target = e.inputEvent.target;
        if ((bpMovableRef!.isMoveableElement(target))
            || selectedNodes.some((t: any) => t === target || t.contains(target))
        ) {
            e.stop();
        }
    }

    const onSelectEnd = (e: OnSelectEnd) => {
        let {selected} = e;
        const {bpMovableRef, setSelectedNodes} = bpStore;
        selected = selected.filter((item) => item.classList.contains('bp-node-container'));
        //更新选中的组件
        setSelectedNodes(selected as HTMLElement[]);
        if (selected.length === 0) return;

        //如果为拖拽，则将当前的整个dom事件传递给movable，确保选中元素后可以立马拖拽
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            setTimeout(() => {
                bpMovableRef!.dragStart(e.inputEvent);
            });
        }
    }

    return (
        <>
            {children}
            <Selecto ref={selectorRef}
                     dragContainer={".blue-print-canvas"}
                     selectableTargets={[".bp-node-container"]}
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
}
