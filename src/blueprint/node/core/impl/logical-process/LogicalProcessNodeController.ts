import {AbstractBPNodeController, AnchorPointType, NodeInfoType} from "../../AbstractBPNodeController";
import {UpdateOptions} from "../../../../../framework/core/AbstractController";
import ComponentUtil from "../../../../../utils/ComponentUtil";
import BPNode, {NodeProps} from "../../../BPNode";
import {NodeType} from "../../../types";
import React from "react";
import ObjectUtil from "../../../../../utils/ObjectUtil";
import {LogicalProcessNodeConfig} from "./LogicalProcessNodeConfig";

export interface LogicalProcessNodeConfig extends NodeProps {
    handler?: string;
}

export default class LogicalProcessNodeController extends AbstractBPNodeController<LogicalProcessNodeConfig> {
    async create(container: HTMLElement, config: LogicalProcessNodeConfig): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BPNode, config);
        return this;
    }

    destroy(): void {
    }

    execute(params: any): void {
    }

    getConfig(): LogicalProcessNodeConfig | null {
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
                    id: nodeId + '_' + NodeType.LOGICAL_PROCESS + '_execute_' + AnchorPointType.INPUT,
                    name: "执行",
                    type: AnchorPointType.INPUT
                }
            ],
            output: [
                {
                    id: nodeId + "_" + NodeType.LOGICAL_PROCESS + "_afterExecute_" + AnchorPointType.OUTPUT,
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