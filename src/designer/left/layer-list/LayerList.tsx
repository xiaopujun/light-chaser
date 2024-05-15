import React, {Component} from 'react';
import './LayerList.less';
import layerManager from "../../manager/LayerManager.ts";
import {observer} from "mobx-react";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import layerBuilder from "./LayerBuilder";
import designerLeftStore from "../DesignerLeftStore";
import {Close} from "@icon-park/react";

export interface LayerListProps {
    children?: React.ReactNode;
}

class LayerList extends Component<LayerListProps> {

    layerListRef: HTMLElement | null = null;

    layerItemsContainerRef: HTMLDivElement | null = null;

    componentDidMount() {
        this.layerListRef?.addEventListener("click", this.cancelSelected);
    }

    componentWillUnmount() {
        this.layerListRef?.removeEventListener("click", this.cancelSelected);
    }

    cancelSelected = (e: MouseEvent) => {
        if (!this.layerListRef)
            return;
        if (this.layerListRef.contains(e.target as Node)
            && !this.layerItemsContainerRef?.contains(e.target as Node)) {
            const {setTargetIds, targetIds} = eventOperateStore;
            if (targetIds.length > 0)
                setTargetIds([]);
        }
    }

    buildLayerList = () => {
        const {layerConfigs} = layerManager;
        return layerBuilder.buildLayerList(layerConfigs);
    }

    render() {
        return (
            <div className={'layer-list'} ref={ref => this.layerListRef = ref}>
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
                    <div ref={ref => this.layerItemsContainerRef = ref}>
                        {this.buildLayerList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default observer(LayerList);