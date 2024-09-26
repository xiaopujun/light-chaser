import React, {Suspense, lazy, useState} from "react";
import {BPRightConfigProps} from "../../../../right/BPRight";
import {debounce} from "lodash";
import Loading from "../../../../../../json-schema/ui/loading/Loading.tsx";
import {nodeListMapping} from "../../../../left/BPLeft";
import './BPSelectMultipleNode.less';
import bpLeftStore from "../../../../left/BPLeftStore";
import {useEffect, useRef} from "react/index";
import DragAddProvider from "../../../../../../framework/drag-scale/DragAddProvider";
import Input from "../../../../../../json-schema/ui/input/Input";
import {observer} from "mobx-react";
import layerManager from "../../../../../manager/LayerManager";
import {CardTwo} from "@icon-park/react";
import { Checkbox } from 'antd';

const MonacoEditor = lazy(() => import("../../../../../../json-schema/ui/code-editor/MonacoEditor"));

export const BPLayerNodeList = observer(({ searchValue, onSelectedChange, value }) => {
    const {layerConfigs} = layerManager;
    const {usedLayerNodes} = bpLeftStore;
    let layerIdList = layerConfigs ? Object.keys(layerConfigs) : [];

    if (searchValue !== '') {
        layerIdList = layerIdList.filter((key) => {
            const item = layerConfigs[key];
            return item.name?.indexOf(searchValue) !== -1
        })
    }

    const onClick = (item) => {
        console.log(item);
    }

    const nodeList = layerIdList.map((key, index) => {
        const item = layerConfigs[key];
        const used = usedLayerNodes[key];
        return {
            ...item,
            label: item.name,
            value: item.id,
        }
    });

    return (
        <>
            {/*{*/}
            {/*    layerIdList.map((key, index) => {*/}
            {/*        const item = layerConfigs[key];*/}
            {/*        const used = usedLayerNodes[key];*/}
            {/*        console.log(item);*/}
            {/*        return (*/}
            {/*            <div onClick={()=>onClick(item)} className={`bp-node-list-item bp-drag-node ${used ? 'bp-node-list-item-used' : ''}`}*/}
            {/*                 data-id={item.id}*/}
            {/*                 data-type={'layer-node'}*/}
            {/*                 draggable={!used} key={index}>*/}
            {/*                <div className={'bpn-li-icon'}><CardTwo/></div>*/}
            {/*                <div className={'bpn-li-label'}>{item.name}</div>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    })*/}
            {/*}*/}
            <Checkbox.Group options={nodeList} defaultValue={value} onChange={onSelectedChange} />
        </>
    )
})

export const BPNodeList = observer(({onSelectedChange, value}) => {
    const [searchValue, setSearchValue] = useState("");

    const NodeList = BPLayerNodeList;

    const handleSearch = (value) => {
        setSearchValue(value);
    }

    return (
        <div className={'bp-node-list'}>
            <div className={'bp-node-list-header'}>
                <div className={'bp-node-list-search'}>
                    <Input placeholder={'搜索节点'} containerStyle={{width: '100%'}}
                           onChange={(value) => handleSearch(value)}/>
                </div>
            </div>
            <div className={'bp-node-list-body'}>
                <div className={'bp-node-list-container'} id={'bp-node-draggable'} style={{overflow: "scroll"}}>
                    {NodeList && <NodeList searchValue={searchValue} onSelectedChange={onSelectedChange} value={value}/>}
                </div>
            </div>
        </div>
    )
})

export const SelectMultipleNodeConfig: React.FC<BPRightConfigProps> = (props) => {
    const {controller} = props;
    console.log("SelectMultipleNodeConfig>>>", props)
    const config = controller?.getConfig();
    const handleCode = config.handler || "function handle(data) { \n \n }";
    const onCodeChange = debounce((value: string | undefined) => {
        if (!value) return;
        controller?.update({handler: value});
    }, 500);

    const onSelectedChange = (selected: string[]) => {
        console.log(selected);
        controller?.update({selectedNodes: selected});
    }

    return (
        <div className={'select-multiple-node-config'}>
            <Suspense fallback={<Loading/>}>
                <BPNodeList onSelectedChange={onSelectedChange} value={config.selectedNodes}/>
                <MonacoEditor value={handleCode} onChange={onCodeChange} height={400}
                              language={'javascript'}/>
            </Suspense>
        </div>
    )
}
