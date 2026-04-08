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

import React, {useEffect, useRef} from "react";
import bluePrintManager, {BPNodeLayoutType} from "../../../manager/BluePrintManager.ts";
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
        const {bpNodeControllerInsMap, bpNodeConfigMap} = bluePrintManager;
        //获取节点配置，优先从bpNodeControllerInsMap中获取，没有则从bpStore.bpNodeConfigMap中获取【上一次保存的配置】，没有的，则最终调用controller的getNodeConfig方法获取【默认配置】
        let nodeConfig = null;
        const prevNodeController = bpNodeControllerInsMap[layout.id!];
        if (prevNodeController)
            nodeConfig = prevNodeController.getConfig();
        else if (bpNodeConfigMap[layout.id!])
            nodeConfig = bpNodeConfigMap[layout.id!];
        else
            nodeConfig = ncIns.getNodeInfo(layout.id!);
        ncIns.create(ref.current!, nodeConfig);
        bpNodeControllerInsMap[layout.id!] = ncIns;
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
