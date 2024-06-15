import {AbstractBPNodeController, AnchorPointType, IBPTaskInfo, NodeInfoType} from "../../AbstractBPNodeController";
import {UpdateOptions} from "../../../../../../framework/core/AbstractController";
import ComponentUtil from "../../../../../../utils/ComponentUtil";
import BPNode, {NodeProps} from "../../../BPNode";
import React from "react";
import ObjectUtil from "../../../../../../utils/ObjectUtil";
import {LogicalProcessNodeConfig} from "./LogicalProcessNodeConfig";

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

    execute(taskInfo: IBPTaskInfo, params: any): void {
        const {nodeId, task, bluePrintManager, layerManager} = taskInfo;
        if (!this.handler) {
            if (!this.config?.handler)
                return;
            try {
                this.handler = eval(`(${this.config.handler})`);
            } catch (e) {
                console.error('解析条件函数错误，请检查你写条件判断函数');
                return;
            }
        }
        const newParams = this.handler!(params) || params;
        const apId = nodeId + ':afterExecute:' + AnchorPointType.OUTPUT;
        task.run(apId, task, bluePrintManager, layerManager, newParams);
    }

    getConfig(): LogicalProcessNodeConfigType | null {
        return this.config;
    }

    update(config: LogicalProcessNodeConfigType, upOp: UpdateOptions | undefined): void {
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