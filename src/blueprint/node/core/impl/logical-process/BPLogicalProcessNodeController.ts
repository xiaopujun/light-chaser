import {AbstractBPNodeController, AnchorPointType, ExecuteInfoType, NodeInfoType} from "../../AbstractBPNodeController";
import {UpdateOptions} from "../../../../../framework/core/AbstractController";
import ComponentUtil from "../../../../../utils/ComponentUtil";
import BPNode, {NodeProps} from "../../../BPNode";
import React from "react";
import ObjectUtil from "../../../../../utils/ObjectUtil";
import {LogicalProcessNodeConfig} from "./LogicalProcessNodeConfig";
import BPExecutor from "../../../../core/BPExecutor";

export interface LogicalProcessNodeConfigType extends NodeProps {
    handler?: string;
}

export default class BPLogicalProcessNodeController extends AbstractBPNodeController<LogicalProcessNodeConfigType> {

    private handler: Function | null = null;

    async create(container: HTMLElement, config: LogicalProcessNodeConfigType): Promise<void> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BPNode, config);
    }

    execute(executeInfo: ExecuteInfoType, executor: BPExecutor, params: any): void {
        const {nodeId} = executeInfo;
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
        const newParams = this.handler!(params) || params;
        const apId = nodeId + ':afterExecute:' + AnchorPointType.OUTPUT;
        executor.execute(apId, executor, newParams);
    }

    getConfig(): LogicalProcessNodeConfigType | null {
        return this.config;
    }

    update(config: any, upOp: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
    }

    getNodeInfo(nodeId: string): NodeInfoType | null {
        return {
            id: nodeId,
            name: "逻辑处理",
            titleBgColor: "#a62469",
            type: "logical-process-node",
            icon: "FunctionOutlined",
            input: [
                {
                    id: nodeId + ':execute:' + AnchorPointType.INPUT,
                    name: "执行",
                    type: AnchorPointType.INPUT
                }
            ],
            output: [
                {
                    id: nodeId + ":afterExecute:" + AnchorPointType.OUTPUT,
                    name: "执行后",
                    type: AnchorPointType.OUTPUT
                }
            ]
        };
    }

    getConfigComponent(): React.ComponentType | null {
        return LogicalProcessNodeConfig;
    }

}