import React, {useEffect} from "react";
import Selecto, {OnSelectEnd} from "react-selecto";
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

    const onDragStart = (e: any) => {
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
        selected = selected.filter((item) => item.classList.contains('bp-node'));
        if (selected.length === 0) return;
        const {bpMovableRef, setSelectedNodes} = bpStore;

        //如果为拖拽，则将当前的整个dom事件传递给movable，确保选中元素后可以立马拖拽
        if (e.isDragStart) {
            e.inputEvent.preventDefault();
            setTimeout(() => {
                bpMovableRef!.dragStart(e.inputEvent);
            });
        }
        //更新选中的组件
        setSelectedNodes(selected as HTMLElement[]);
    }

    return (
        <>
            {children}
            <Selecto ref={selectorRef}
                     dragContainer={".blue-print"}
                     selectableTargets={[".bp-node"]}
                     hitRate={0}
                     selectByClick={true}
                     selectFromInside={false}
                     toggleContinueSelect={["ctrl"]}
                     ratio={0}
                     onDragStart={onDragStart}
                     onSelectEnd={onSelectEnd}
            />
        </>
    )
}
