import React, {useEffect, useRef} from "react";
import bpStore, {BPNodeLayoutType} from "../../../store/BPStore";
import bpNodeControllerMap from "../impl/BPNodeControllerMap";
import bpRightStore from "../../../right/BPRightStore";
import './BPNodeContainer.less';

export interface BPNodeContainerProps {
    layout: BPNodeLayoutType;
}

export const BPNodeContainer: React.FC<BPNodeContainerProps> = React.memo(({layout}) => {
    const ref = useRef<HTMLDivElement>(null);

    const activeNodeConfig = (id: string) => {
        const {setActiveNode} = bpRightStore;
        setActiveNode(id);
    }

    useEffect(() => {
        const NodeController = bpNodeControllerMap.get(layout.type!);
        if (!NodeController) return;
        const ncIns = new NodeController();
        if (!ncIns) return;
        const {bpNodeControllerInsMap, bpNodeConfigMap} = bpStore;
        //获取节点配置，优先从bpStore.bpNodeConfigMap中获取【已经保存的配置】，没有的，则调用controller的getNodeConfig方法获取【默认配置】
        let nodeInfo = bpNodeConfigMap[layout.id!];
        if (!nodeInfo)
            nodeInfo = ncIns.getNodeInfo(layout.id!);
        ncIns.create(ref.current!, nodeInfo!).then(() => {
            bpNodeControllerInsMap[layout.id!] = ncIns;
        });
    }, [layout.id, layout.type]);
    const {position, id} = layout;
    return (
        <div ref={ref} className={'bp-node-container'}
             id={`bpnode:${id}`}
             onDoubleClick={() => activeNodeConfig(id!)}
             style={{
                 transform: 'translate(' + position!.x + 'px,' + position!.y + 'px)',
             }}
        />
    )
})
