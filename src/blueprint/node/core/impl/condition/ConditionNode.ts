import {AbstractNode, AnchorPointType, NodeInfoType} from "../../AbstractNode";
import {ConditionNodeConfig} from "./ConditionNodeConfig";
import React from "react";
import {NodeType} from "../../../types";
import {idGenerate} from "../../../../../utils/IdGenerate";

export interface ConditionNodeConfigType {
    handler?: (params: any) => void;
}

export default class ConditionNode extends AbstractNode<ConditionNodeConfigType> {
    execute(params: any): void {
    }

    getConfigComponent(): React.ReactNode {
        return ConditionNodeConfig;
    }

    getNodeInfo(): NodeInfoType {
        //生成id
        const id = idGenerate.generateId();
        return {
            id,
            name: "条件判断",
            titleBgColor: "#247ba6",
            type: "logical",
            input: [
                {
                    id: id + '_' + NodeType.CONDITION + '_judge_' + AnchorPointType.INPUT,
                    name: "判断",
                    type: AnchorPointType.INPUT
                }
            ],
            output: [
                {
                    id: id + "_" + NodeType.CONDITION + "_satisfy_" + AnchorPointType.OUTPUT,
                    name: "满足",
                    type: AnchorPointType.OUTPUT
                },
                {
                    id: id + '_' + NodeType.CONDITION + '_unSatisfy_' + AnchorPointType.OUTPUT,
                    name: "不满足",
                    type: AnchorPointType.OUTPUT
                }
            ]
        };
    }

    updateConfig(params: any): void {
    }

}