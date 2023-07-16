import React, {Component} from 'react';
import './LayerList.less';
import {Input} from "antd";
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import LayerItem from "./LayerItem";
import {observer} from "mobx-react";
import FloatPanel from "../common/FloatPanel";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import eventManager from "../../operate-provider/core/EventManager";

class LayerList extends Component {

    componentDidMount() {
        eventManager.register("click", this.cancelSelected);
    }

    componentWillUnmount() {
        eventManager.unregister("click", this.cancelSelected);
    }

    //todo: 想想怎么优化
    cancelSelected = (e: PointerEvent) => {
        const layerListDom = document.querySelector(".layer-list");
        if (!layerListDom || !e.target) return;
        if (layerListDom.contains(e.target as Node) && !(e.target as HTMLElement).classList.contains("layer-item")) {
            const {setTargetIds, setTargets} = eventOperateStore;
            setTargetIds([]);
            setTargets([]);
        }
    }

    onClose = () => {
        const {setVisible} = layerListStore;
        setVisible && setVisible(false);
    }

    searchLayer = (e: any) => {
        console.log(e.target.value);

    }

    lockChange = (compId: string, data: boolean) => {
        const {updateLayout} = designerStore;
        const {targetIds, targets, setTargetIds, setTargets} = eventOperateStore;
        if (targetIds.includes(compId)) {
            const newTargetIds = targetIds.filter(id => id !== compId);
            setTargetIds(newTargetIds);
        }
        if (targets && targets.length > 0) {
            const newTargets = targets.filter(target => target.id !== compId);
            if (newTargets.length !== targets.length)
                setTargets(newTargets);
        }
        updateLayout && updateLayout([{id: compId, locked: data}]);
    }

    selectedChange = (compId: string) => {
        const {setTargets, setTargetIds} = eventOperateStore;
        const targetDom = document.getElementById(compId);
        if (!targetDom) return;
        setTargetIds([compId]);
        setTargets([targetDom]);
    }

    hideChange = (compId: string, data: boolean) => {
        const {updateLayout} = designerStore;
        updateLayout && updateLayout([{id: compId, hide: data}]);
    }

    buildLayerList = () => {
        const {layoutConfigs} = designerStore;
        const {targetIds} = eventOperateStore;
        return Object.values(layoutConfigs).sort((a: any, b: any) => b.order - a.order).map((item: any, index) => {
            return <LayerItem key={index + ''}
                              data={{
                                  name: item.name,
                                  lock: item.locked,
                                  hide: item.hide,
                                  compId: item.id,
                                  selected: targetIds.includes(item.id)
                              }}
                              lockChange={this.lockChange}
                              selectedChange={this.selectedChange}
                              hideChange={this.hideChange}/>
        });
    }

    render() {
        return (
            <FloatPanel title={'图层'} onClose={this.onClose} initPosition={{x: 250, y: -window.innerHeight + 50}}
                        className={'layer-list'}>
                <div className={'list-search'}>
                    <Input placeholder="搜索图层" onPressEnter={this.searchLayer}
                           style={{width: '100%'}}/>
                </div>
                <div className={'layer-items'}>
                    {this.buildLayerList()}
                </div>
            </FloatPanel>
        );
    }
}

export default observer(LayerList);