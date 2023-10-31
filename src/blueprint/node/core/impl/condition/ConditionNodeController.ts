import {AbstractBPNodeController, AnchorPointType, NodeInfoType} from "../../AbstractBPNodeController";
import ComponentUtil from "../../../../../utils/ComponentUtil";
import {UpdateOptions} from "../../../../../framework/core/AbstractController";
import BPNode from "../../../BPNode";
import {idGenerate} from "../../../../../utils/IdGenerate";
import {NodeType} from "../../../types";
import {BranchesOutlined} from "@ant-design/icons";

export interface ConditionConfigType {

}

export default class ConditionNodeController extends AbstractBPNodeController<ConditionConfigType> {
    async create(container: HTMLElement, config: ConditionConfigType): Promise<this> {
        this.config = config;
        this.container = container;
        this.instance = await ComponentUtil.createAndRender(container, BPNode, config);
        return this;
    }

    destroy(): void {
    }

    execute(params: any): void {
    }

    getConfig(): ConditionConfigType | null {
        return null;
    }

    update(config: ConditionConfigType, upOp?: UpdateOptions | undefined): void {
    }

    getNodeInfo(nodeId?: string): NodeInfoType | null {
        //生成id
        const id = idGenerate.generateId();
        return {
            id,
            name: "条件判断",
            titleBgColor: "#247ba6",
            type: "logical",
            icon: BranchesOutlined,
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

}