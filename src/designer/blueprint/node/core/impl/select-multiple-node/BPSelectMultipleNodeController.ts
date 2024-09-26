import {AbstractBPNodeController, AnchorPointType, ExecuteInfoType, NodeInfoType} from "../../AbstractBPNodeController";
import {UpdateOptions} from "../../../../../../framework/core/AbstractController";
import ComponentUtil from "../../../../../../utils/ComponentUtil";
import BPNode, {NodeProps} from "../../../BPNode";
import React from "react";
import ObjectUtil from "../../../../../../utils/ObjectUtil";
import {SelectMultipleNodeConfig} from "./SelectMultipleNodeConfig";
import BPExecutor from "../../../../core/BPExecutor";
import bluePrintManager from "../../../../manager/BluePrintManager";
import layerManager from "../../../../../manager/LayerManager";
import {toJS} from "mobx";
import layerBuilder from "../../../../../left/layer-list/LayerBuilder";
import layerListStore from "../../../../../left/layer-list/LayerListStore";

export interface SelectMultipleNodeConfigType extends NodeProps {
    handler?: string;
    selectedNodes?: string[];
}

export default class BPSelectMultipleNodeController extends AbstractBPNodeController<SelectMultipleNodeConfigType> {

    private handler: Function | null = null;
    private selectedNodes: string[] | undefined = [];

    async create(container: HTMLElement, config: SelectMultipleNodeConfigType): Promise<void> {
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
        // const newParams = this.handler!(params) || params;
        const apId = nodeId + ':afterExecute:' + AnchorPointType.OUTPUT;

        const config = this.getConfig();
        const { selectedNodes = [] }  = config;
        this.selectedNodes = selectedNodes;
        const {layerConfigs, compController} = layerManager;
        const layerList = layerBuilder.buildLayerList(layerConfigs);
        const newParams = {};
        // 这样有问题，如果嵌套编组就有问题，后面需要用递归的方式实现
        selectedNodes?.forEach(nodeId=>{
            let selectedNode = layerConfigs[nodeId];
            if(selectedNode.type !== "group"){
                const controller = compController[selectedNode.id];
                newParams[selectedNode.id] = controller.getConfig();
            }else{
                selectedNode = layerList.find(item=>item.key==nodeId);
                if(selectedNode && selectedNode.props.children){
                    console.log(selectedNode.props.children);
                    selectedNode.props.children.map(({key})=>{
                        const controller = compController[key];
                        newParams[key] = controller.getConfig();
                    });
                }
            }
        });
        executor.execute(apId, executor, newParams);
    }

    getConfig(): SelectMultipleNodeConfigType | null {
        return this.config;
    }

    update(config: SelectMultipleNodeConfigType, upOp: UpdateOptions | undefined): void {
        this.config = ObjectUtil.merge(this.config, config);
    }

    getNodeInfo(nodeId: string): NodeInfoType | null {
        return {
            id: nodeId,
            name: "选择多个节点",
            titleBgColor: "#a62469",
            type: "select-multiple-node",
            icon: "FunctionOutlined",
            input: [
                {
                    id: nodeId + ':execute:' + AnchorPointType.INPUT,
                    name: "选择节点",
                    type: AnchorPointType.INPUT
                }
            ],
            output: [
                {
                    id: nodeId + ":afterExecute:" + AnchorPointType.OUTPUT,
                    name: "选择节点后",
                    type: AnchorPointType.OUTPUT
                }
            ]
        };
    }

    getConfigComponent(): React.ComponentType | null {
        return SelectMultipleNodeConfig;
    }

}
