import React, {useEffect, useRef} from "react";
import bpStore, {BPNodeLayoutType} from "../../store/BPStore";
import bpNodeControllerMap from "./impl/BPNodeControllerMap";

export interface BPNodeContainerProps {
    layout: BPNodeLayoutType;
}

export const BPNodeContainer: React.FC<BPNodeContainerProps> = ({layout}) => {

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const NodeController = bpNodeControllerMap.get(layout.type!);
        if (!NodeController) return;
        const ncIns = new NodeController();
        if (!ncIns) return;
        const nodeInfo = ncIns.getNodeInfo(layout?.id!);
        ncIns.create(ref.current!, nodeInfo!).then((node) => {
            const {bpNodeControllerInsMap} = bpStore;
            bpNodeControllerInsMap[layout.id!] = ncIns;
        });
    }, [layout.id, layout.type]);
    const {canvasTranslate, canvasScale} = bpStore;
    const {position} = layout;
    return (
        <div ref={ref} className={'.bp-node-container'}
             style={{
                 transform: 'translate(' + (position!.x - canvasTranslate.x) / canvasScale + 'px,' + (position!.y - canvasTranslate.y) / canvasScale + 'px)',
                 position: 'absolute',
                 width: 160,
                 minHeight: 80,
             }}
        />
    )
}
