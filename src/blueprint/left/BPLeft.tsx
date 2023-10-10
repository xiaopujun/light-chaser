import React, {useEffect} from "react";
import './BPLeft.less';
import {
    ApartmentOutlined,
    CodeSandboxOutlined,
    FilterOutlined,
    GatewayOutlined,
    NodeIndexOutlined
} from "@ant-design/icons";
import {AnchorPointType} from "../node/BPNode";
import bpStore from "../store/BPStore";
import bpLeftStore from "./BPLeftStore";
import {observer} from "mobx-react";
import designerStore from "../../designer/store/DesignerStore";
import EditorDesignerLoader from "../../designer/loader/EditorDesignerLoader";

export const BPLeft: React.FC = () => {
    return (
        <div className={'bp-left'}>
            <BPNodeSortList/>
            <BPNodeList/>
        </div>
    )
}

export const BPNodeSortList = () => {
    const nodeSortList = [
        {
            icon: <CodeSandboxOutlined/>,
            label: '图层节点',
            key: 'layer'
        },
        {
            icon: <ApartmentOutlined/>,
            label: '逻辑节点',
            key: 'logical'
        },
        {
            icon: <GatewayOutlined/>,
            label: '全局变量',
            key: 'global'
        },
        {
            icon: <FilterOutlined/>,
            label: '过滤器',
            key: 'filter'
        }
    ]
    return (
        <div className={'bp-node-sort-list'}>
            {
                nodeSortList.map((item, index) => {
                    return (
                        <div className={'bp-left-item'} key={index} onClick={() => {
                            bpLeftStore.setActiveMenu(item.key)
                        }}>
                            <div className={'bp-item-icon'}>{item.icon}</div>
                            <div className={'bp-item-label'}>{item.label}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export const BPNodeList = observer(() => {

    useEffect(() => {
        const dropContainer = document.getElementById("bp-node-container");
        const dragElements = document.getElementsByClassName("bp-node-list-item");
        const {layoutConfigs} = designerStore;
        const {customComponentInfoMap} = EditorDesignerLoader.getInstance();
        Array.from(dragElements).forEach((element) => {
            element.addEventListener('dragstart', (event) => {
                // 设置拖拽数据
                (event as any).dataTransfer.setData('info', element.getAttribute('data-info'));
            });
        });
        dropContainer && dropContainer.addEventListener('dragover', (event) => {
            event.preventDefault(); // 阻止默认行为以允许拖放
        });
        dropContainer && dropContainer.addEventListener('drop', (event) => {
            event.preventDefault();
            const nodeId = (event as any).dataTransfer.getData('info');
            //获取鼠标位置
            const position = {x: event.offsetX, y: event.offsetY};
            const {setUsedLayerNodes} = bpLeftStore;
            setUsedLayerNodes(nodeId, true);
            const {addNodes} = bpStore;
            const node = layoutConfigs[nodeId];
            const output = customComponentInfoMap[node.type!].getEventList().map((item) => {
                return {
                    id: item.key,
                    title: item.name,
                    type: AnchorPointType.OUTPUT
                }
            });
            const input = customComponentInfoMap[node.type!].getActionList().map((item) => {
                return {
                    id: item.key,
                    title: item.name,
                    type: AnchorPointType.INPUT
                }
            });
            addNodes({
                title: node.name,
                position: position,
                input: input,
                output: output,
            })
        });
    })
    const {activeMenu} = bpLeftStore;
    const NodeList = nodeListMapping[activeMenu];
    return (
        <div className={'bp-node-list'}>
            <div className={'bp-node-list-header'}>
                <div className={'bp-node-list-header-label'}>图层节点(取自画布已有组件)</div>
            </div>
            <div className={'bp-node-list-body'}>
                {NodeList && <NodeList/>}
            </div>
        </div>
    )
})

export const buildLayerNode = () => {

}

export const BPLayerNodeList = observer(() => {
    const {layoutConfigs,} = designerStore;
    const {usedLayerNodes} = bpLeftStore;
    return (
        <>
            {
                layoutConfigs && Object.keys(layoutConfigs).map((key, index) => {
                    const item = layoutConfigs[key];
                    const used = usedLayerNodes[key];
                    return (
                        <div className={`bp-node-list-item ${used ? 'bp-node-list-item-used' : ''}`}
                             data-info={item.id}
                             draggable={!used} key={index}>
                            <div className={'bpn-li-icon'}><NodeIndexOutlined/></div>
                            <div className={'bpn-li-label'}>{item.name}</div>
                        </div>
                    )
                })
            }
        </>
    )
})

export const BPLogicalNodeList = () => {
    return (
        <div>逻辑节点列表</div>
    )

}

export const BPGlobalVariablesNodeList = () => {
    return (
        <div>全局变量</div>
    )

}

export const BPFilterNodeList = () => {
    return (
        <div>过滤器</div>
    )

}

export const nodeListMapping: { [key: string]: React.FC } = {
    'layer': BPLayerNodeList,
    'logical': BPLogicalNodeList,
    'global': BPGlobalVariablesNodeList,
    'filter': BPFilterNodeList
}
