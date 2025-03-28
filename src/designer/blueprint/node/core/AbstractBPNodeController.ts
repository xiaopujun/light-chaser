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

import AbstractController from "../../../../framework/core/AbstractController";
import React from "react";
import BPExecutor from "../../core/BPExecutor";

export interface NodeInfoType {
    id?: string;
    icon?: string;
    name?: string;
    type?: string;
    titleBgColor?: string;
    input?: AnchorPointInfoType[];
    output?: AnchorPointInfoType[];
}

/**
 * 锚点信息
 */
export interface AnchorPointInfoType {
    id?: string;
    name?: string;
    type?: AnchorPointType;
}

/**
 * 锚点类型
 */
export enum AnchorPointType {
    INPUT,
    OUTPUT
}

export interface ExecuteInfoType {
    nodeId: string;
    apId: string;
    anchorType: AnchorPointType;
}


/**
 * 抽象蓝图节点控制器
 */
export abstract class AbstractBPNodeController<C = any> extends AbstractController<any, C> {
    /**
     * 定义统一构造器，子类不需要再定义构造器
     * @param config
     */
    constructor(config?: C) {
        super();
        if (config)
            this.config = config;
    }

    /**
     * 蓝图节点执行器，当执行蓝图节点构建的逻辑路径时，不同的节点根据该方法执行自己内部对应的逻辑解析方案，并产生对应的输出
     * @param executeInfo
     * @param executor
     * @param params
     */
    public abstract execute(executeInfo: ExecuteInfoType, executor: BPExecutor, params: any): void;

    /**
     * 获取蓝图节点的配置信息
     */
    public abstract getNodeInfo(nodeId?: string): NodeInfoType | null;

    public abstract getConfigComponent(): React.ComponentType | null;
}