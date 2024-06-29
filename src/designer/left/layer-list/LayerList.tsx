import React, {useEffect} from 'react';
import './LayerList.less';
import layerManager from "../../manager/LayerManager.ts";
import {observer} from "mobx-react";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import layerBuilder from "./LayerBuilder";
import designerLeftStore from "../DesignerLeftStore";
import {Close} from "@icon-park/react";


const LayerList = () => {
    const layerListRef = React.useRef<HTMLDivElement | null>(null);
    const layerItemsContainerRef = React.useRef<HTMLDivElement | null>(null);

    const cancelSelected = (e: MouseEvent) => {
        if (!layerListRef.current)
            return;
        if (layerListRef.current.contains(e.target as Node)
            && !layerItemsContainerRef.current?.contains(e.target as Node)) {
            const {setTargetIds, targetIds} = eventOperateStore;
            if (targetIds.length > 0)
                setTargetIds([]);
        }
    }

    const buildLayerList = () => {
        const {layerConfigs} = layerManager;
        return layerBuilder.buildLayerList(layerConfigs);
    }


    useEffect(() => {
        layerListRef.current?.addEventListener("click", cancelSelected);
        return () => layerListRef.current?.removeEventListener("click", cancelSelected);
    }, []);

    return (
        <div className={'layer-list'} ref={layerListRef}>
            <div className={'dl-ll-header'}>
                <div className={'dl-ll-header-title'}>图层列表</div>
                <div className={'dl-ll-header-operate'}><Close style={{cursor: 'pointer'}} onClick={() => {
                    const {setMenu} = designerLeftStore;
                    setMenu("");
                    const {rulerRef} = eventOperateStore;
                    rulerRef?.ruleWheel();
                }}/></div>
            </div>
            <div className={'layer-items'}>
                <div ref={layerItemsContainerRef}>
                    {buildLayerList()}
                </div>
            </div>
        </div>
    );
}

export default observer(LayerList);