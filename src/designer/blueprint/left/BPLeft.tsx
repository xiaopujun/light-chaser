import React, {useEffect, useRef} from "react";
import './BPLeft.less';
import bluePrintManager from "../manager/BluePrintManager.ts";
import bpLeftStore from "./BPLeftStore";
import {observer} from "mobx-react";
import layerManager from "../../manager/LayerManager.ts";
import IdGenerate from "../../../utils/IdGenerate";
import DragAddProvider from "../../../framework/drag-scale/DragAddProvider";
import Input from "../../../json-schema/ui/input/Input.tsx";
import {AddSubset, ApplicationOne, BytedanceMiniApp, CardTwo, MindmapMap} from "@icon-park/react";

const BPLeft: React.FC = () => {
    return (
        <div className={'bp-left'}>
            <BPNodeSortList/>
            <BPNodeList/>
        </div>
    )
}
export default BPLeft;

export const BPNodeSortList = observer(() => {
    const {activeMenu} = bpLeftStore;
    const nodeSortList = [
        {
            icon: <ApplicationOne/>,
            label: '图层节点',
            key: 'layer'
        },
        {
            icon: <MindmapMap/>,
            label: '逻辑节点',
            key: 'logical'
        },
        // {
        //     icon: <Calculator/>,
        //     label: '全局变量',
        //     key: 'global'
        // },
        // {
        //     icon: <Filter/>,
        //     label: '过滤器',
        //     key: 'filter'
        // }
    ]
    return (
        <div className={'bp-node-sort-list'}>
            {
                nodeSortList.map((item, index) => {
                    return (
                        <div className={`bp-left-item ${activeMenu === item.key ? "bp-left-item-active" : ""}`}
                             key={index} onClick={() => {
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
})

//拖拽开始
const dragStart = (event: DragEvent) => {
    if ((event.target as HTMLElement).classList.contains('bp-drag-node')) {
        const element = event.target as HTMLElement;
        // 设置拖拽数据
        event.dataTransfer?.setData('nodeId', element.getAttribute('data-id')!);
        event.dataTransfer?.setData('type', element.getAttribute('data-type')!);
    }
}
//拖拽覆盖
const dragover = (event: DragEvent) => {
    event.preventDefault(); // 阻止默认行为以允许拖放
}
//释放拖拽元素
const drop = (event: DragEvent) => {
    event.preventDefault();
    let nodeId = event.dataTransfer?.getData('nodeId');
    const type = event.dataTransfer?.getData('type');
    const {bpDragContentRef, canvasScale} = bluePrintManager;
    const contentPos = bpDragContentRef?.getBoundingClientRect();
    //获取鼠标位置
    const position = {
        x: (event.clientX - (contentPos?.x || 0)) / canvasScale,
        y: (event.clientY - (contentPos?.y || 0)) / canvasScale
    };
    if (type === 'layer-node') {
        const {setUsedLayerNodes} = bpLeftStore;
        setUsedLayerNodes(nodeId!, true);
    } else {
        //非图层节点，需要单独生成一个唯一节点id
        nodeId = IdGenerate.generateId();
    }
    const {addBPNodeLayout} = bluePrintManager;
    addBPNodeLayout({id: nodeId, type, position});
}

export const BPNodeList = observer(() => {
    const {activeMenu, setSearchValue} = bpLeftStore;
    const NodeList = nodeListMapping[activeMenu];
    const dragAddProvider = useRef<DragAddProvider | null>(null);

    useEffect(() => {
        dragAddProvider.current = new DragAddProvider(
            document.getElementById("bp-node-draggable")!,
            document.getElementById("bp-ds-container")!,
            dragStart,
            dragover,
            drop
        );

        return () => dragAddProvider.current?.destroy();
    }, [activeMenu])
    return (
        <div className={'bp-node-list'}>
            <div className={'bp-node-list-header'}>
                <div className={'bp-node-list-search'}>
                    <Input placeholder={'搜索节点'} containerStyle={{width: '100%'}}
                           onChange={(value) => setSearchValue(value)}/>
                </div>
            </div>
            <div className={'bp-node-list-body'}>
                <div className={'bp-node-list-container'} id={'bp-node-draggable'} style={{overflow: "scroll"}}>
                    {NodeList && <NodeList/>}
                </div>
            </div>
        </div>
    )
})

export const BPLayerNodeList = observer(() => {
    const {layerConfigs} = layerManager;
    const {usedLayerNodes, searchValue} = bpLeftStore;
    let layerIdList = layerConfigs ? Object.keys(layerConfigs) : [];
    if (searchValue !== '') {
        layerIdList = layerIdList.filter((key) => {
            const item = layerConfigs[key];
            return item.name?.indexOf(bpLeftStore.searchValue) !== -1
        })
    }
    return (
        <>
            {
                layerIdList.map((key, index) => {
                    const item = layerConfigs[key];
                    const used = usedLayerNodes[key];
                    return (
                        <div className={`bp-node-list-item bp-drag-node ${used ? 'bp-node-list-item-used' : ''}`}
                             data-id={item.id}
                             data-type={'layer-node'}
                             draggable={!used} key={index}>
                            <div className={'bpn-li-icon'}><CardTwo/></div>
                            <div className={'bpn-li-label'}>{item.name}</div>
                        </div>
                    )
                })
            }
        </>
    )
})

export const BPLogicalNodeList = observer(() => {

    const logicalNodeList = [
        {name: '条件判断', icon: AddSubset, type: 'condition-node'},
        {name: '逻辑处理', icon: BytedanceMiniApp, type: 'logical-process-node'},
    ].filter((item) => item.name.indexOf(bpLeftStore.searchValue) !== -1)

    return (
        <>
            {
                logicalNodeList.map((item, index) => {
                    return (
                        <div className={`bp-node-list-item bp-drag-node`}
                             data-type={item.type}
                             draggable={true} key={index}>
                            <div className={'bpn-li-icon'}>
                                <item.icon/>
                            </div>
                            <div className={'bpn-li-label'}>{item.name}</div>
                        </div>
                    )
                })
            }
        </>
    )
})

export const BPGlobalVariablesNodeList = () => {
    return (
        <div>开发中...</div>
    )

}

export const BPFilterNodeList = () => {
    return (
        <div>开发中...</div>
    )

}

export const nodeListMapping: { [key: string]: React.FC } = {
    'layer': BPLayerNodeList,
    'logical': BPLogicalNodeList,
    'global': BPGlobalVariablesNodeList,
    'filter': BPFilterNodeList
}
