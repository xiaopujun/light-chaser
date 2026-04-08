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

import React from "react";
import './BPRight.less';
import {observer} from "mobx-react";
import bluePrintManager from "../manager/BluePrintManager.ts";
import bpRightStore from "./BPRightStore";
import Accordion from "../../../json-schema/ui/accordion/Accordion";
import {AbstractBPNodeController} from "../node/core/AbstractBPNodeController";

export interface BPRightConfigProps {
    controller?: AbstractBPNodeController;
}

const BPRight: React.FC = observer(() => {
    const {bpNodeControllerInsMap} = bluePrintManager;
    const {activeNode} = bpRightStore;
    const activeNodeController = bpNodeControllerInsMap[activeNode!];
    const nodeConfig = activeNodeController?.getConfig();
    if (!nodeConfig)
        return <div className={'bp-right node-config-empty-info'}>请激活节点配置...</div>
    const apList = [...nodeConfig.input, ...nodeConfig.output]
    const ConfigComponent: React.ComponentType<BPRightConfigProps> | null = activeNodeController.getConfigComponent();
    return (
        <div className={'bp-right bp-node-config'}>
            <div className={'bp-node-config-header'}>
                <div className={'bp-node-config-name'}>{nodeConfig?.name}</div>
                <div className={'bp-node-config-info'}>{`${nodeConfig?.id} | ${nodeConfig?.type}`}</div>
            </div>
            <div className={'bp-ap-info-list'}>
                <Accordion label={'锚点信息'}>
                    {apList.map(ap => {
                        return (
                            <div className={'bp-ap-info-item'} key={ap.id}>
                                <div className={`bp-ap-info-type ${ap.type === 0 ? 'type-input' : 'type-output'}`}>
                                    {ap.type === 0 ? '输入' : '输出'}
                                </div>
                                <div className={'bp-ap-info-name'}>{ap.name}</div>
                            </div>
                        )
                    })}
                </Accordion>
            </div>
            {
                ConfigComponent &&
                <div className={'bp-node-config-detail'}>
                    <Accordion label={'节点配置'}>
                        <ConfigComponent controller={activeNodeController}/>
                    </Accordion>
                </div>
            }
        </div>
    )
})

export default BPRight;