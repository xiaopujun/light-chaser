import React, {useEffect} from "react";
import './BPLeft.less';
import {
    ApartmentOutlined,
    BlockOutlined,
    BranchesOutlined,
    CodeSandboxOutlined,
    FilterOutlined,
    GatewayOutlined
} from "@ant-design/icons";
import bpStore from "../store/BPStore";
import bpLeftStore from "./BPLeftStore";
import {observer} from "mobx-react";
import designerStore from "../../designer/store/DesignerStore";
import {NodeFactory} from "../node/factory/NodeFactory";

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

//拖拽开始
const dragStart = (event: any, element: Element) => {
    // 设置拖拽数据
    (event as any).dataTransfer.setData('nodeId', element.getAttribute('data-id'));
    (event as any).dataTransfer.setData('type', element.getAttribute('data-type'));
}
//拖拽覆盖
const dragover = (event: any) => {
    event.preventDefault(); // 阻止默认行为以允许拖放
}
//释放拖拽元素
const drop = (event: any) => {
    event.preventDefault();
    const nodeId = (event as any).dataTransfer.getData('nodeId');
    const type = (event as any).dataTransfer.getData('type');
    //获取鼠标位置
    const position = {x: event.layerX, y: event.layerY};
    if (type === 'layer-node') {
        const {setUsedLayerNodes} = bpLeftStore;
        setUsedLayerNodes(nodeId, true);
    }
    const {addNodes} = bpStore;
    const nodeObj = NodeFactory.createNode(type, nodeId);
    nodeObj!.position = position;
    addNodes(nodeObj!);
}

export const BPNodeList = observer(() => {
    const {activeMenu} = bpLeftStore;
    const NodeList = nodeListMapping[activeMenu];

    useEffect(() => {
        const dropContainer = document.getElementById("blue-print");
        const dragElements = document.getElementsByClassName("bp-node-list-item");
        Array.from(dragElements).forEach((element) => {
            element.removeEventListener('dragstart', (event) => dragStart(event, element));
            element.addEventListener('dragstart', (event) => dragStart(event, element));
        });
        dropContainer && dropContainer.removeEventListener('dragover', dragover);
        dropContainer && dropContainer.addEventListener('dragover', dragover);
        dropContainer && dropContainer.removeEventListener('drop', drop);
        dropContainer && dropContainer.addEventListener('drop', drop);
    }, [activeMenu])
    return (
        <div className={'bp-node-list'}>
            <div className={'bp-node-list-header'}>
                <div className={'bp-node-list-header-label'}>图层节点(取自画布已有组件)</div>
            </div>
            <div className={'bp-node-list-body'}>
                <div className={'bp-node-list-container'} style={{overflow: "scroll"}}>
                    {NodeList && <NodeList/>}
                </div>
            </div>
        </div>
    )
})

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
                             data-id={item.id}
                             data-type={'layer-node'}
                             draggable={!used} key={index}>
                            <div className={'bpn-li-icon'}><BlockOutlined/></div>
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
        <div className={`bp-node-list-item`}
             data-type={'condition-node'}
             draggable={true}>
            <div className={'bpn-li-icon'}><BranchesOutlined/></div>
            <div className={'bpn-li-label'}>条件判断</div>
        </div>
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
