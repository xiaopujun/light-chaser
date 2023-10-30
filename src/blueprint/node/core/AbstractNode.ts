import React from "react";

export interface NodeInfoType {
    id?: string;
    icon?: any;
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

/**
 * 定义蓝图节点的基础信息和数据
 */
export abstract class AbstractNode<C = any> {

    private config: C | null = null;

    public abstract updateConfig(params: C): void;

    public abstract getNodeInfo(params?: any): NodeInfoType;

    public abstract getConfigComponent(): React.ReactNode;

    public abstract execute(params?: any): void;
}