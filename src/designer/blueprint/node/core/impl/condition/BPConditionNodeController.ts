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

import {AbstractBPNodeController, AnchorPointType, ExecuteInfoType, NodeInfoType} from "../../AbstractBPNodeController";
import ComponentUtil from "../../../../../../utils/ComponentUtil";
import {UpdateOptions} from "../../../../../../framework/core/AbstractController";
import BPNode from "../../../BPNode";
import React from "react";
import {ConditionNodeConfig} from "./ConditionNodeConfig";
import ObjectUtil from "../../../../../../utils/ObjectUtil";
import BPExecutor from "../../../../core/BPExecutor";

export interface ConditionConfigType extends NodeInfoType {
    handler?: string;
}

export default class BPConditionNodeController extends AbstractBPNodeController<ConditionConfigType> {

    private handler: Function | null = null;

    async create(container: HTMLElement, config: ConditionConfigType): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BPNode, config);
    }

    execute(executeInfo: ExecuteInfoType, executor: BPExecutor, params: any): void {
        const {nodeId, anchorType} = executeInfo;
        //输出类型节点不执行
        if (anchorType === 1)
            return;
        if (!this.handler) {
            if (!this.config?.handler)
                return;
            try {
                // eslint-disable-next-line
                this.handler = eval(`(${this.config.handler})`);
            } catch (e) {
                console.error('解析条件函数错误，请检查你写条件判断函数');
                return;
            }
        }
        const result = this.handler!(params);
        if (result) {
            const anchorId = nodeId + ":satisfy:" + AnchorPointType.OUTPUT;
            executor.execute(anchorId, executor, params);
        } else {
            const anchorId = nodeId + ':unSatisfy:' + AnchorPointType.OUTPUT;
            executor.execute(anchorId, executor, params);
        }
    }

    getConfig(): ConditionConfigType | null {
        return this.config;
    }

    update(config: ConditionConfigType, upOp?: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
    }

    getNodeInfo(nodeId?: string): NodeInfoType | null {
        return {
            id: nodeId,
            name: "条件判断",
            titleBgColor: "#247ba6",
            type: "condition-node",
            icon: "BranchesOutlined",
            input: [
                {
                    id: nodeId + ':judge:' + AnchorPointType.INPUT,
                    name: "判断",
                    type: AnchorPointType.INPUT
                }
            ],
            output: [
                {
                    id: nodeId + ":satisfy:" + AnchorPointType.OUTPUT,
                    name: "满足",
                    type: AnchorPointType.OUTPUT
                },
                {
                    id: nodeId + ':unSatisfy:' + AnchorPointType.OUTPUT,
                    name: "不满足",
                    type: AnchorPointType.OUTPUT
                }
            ]
        };
    }

    public getConfigComponent(): React.ComponentType | null {
        return ConditionNodeConfig;
    }

}