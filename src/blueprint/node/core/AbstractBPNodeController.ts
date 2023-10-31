import AbstractController from "../../../framework/core/AbstractController";

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


/**
 * 抽象蓝图节点控制器
 */
export abstract class AbstractBPNodeController<C = any> extends AbstractController<any, C> {
    /**
     * 蓝图节点执行器，当执行蓝图节点构建的逻辑路径时，不同的节点根据该方法执行自己内部对应的逻辑解析方案，并产生对应的输出
     * @param params
     */
    public abstract execute(params: any): void;

    /**
     * 获取蓝图节点的配置信息
     */
    public abstract getNodeInfo(nodeId?: string): NodeInfoType | null;
}