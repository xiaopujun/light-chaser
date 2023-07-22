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

//todo 该组件的重新渲染逻辑要重点优化
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

    lockChange = (data: any) => {
        console.log('lockChange', data);
        const {updateLayout} = designerStore;
        const {targetIds, targets, setTargetIds, setTargets} = eventOperateStore;
        if (targetIds.includes(data.compId)) {
            const newTargetIds = targetIds.filter(id => id !== data.compId);
            setTargetIds(newTargetIds);
        }
        if (targets && targets.length > 0) {
            const newTargets = targets.filter(target => target.id !== data.compId);
            if (newTargets.length !== targets.length)
                setTargets(newTargets);
        }
        updateLayout && updateLayout([{id: data.compId, locked: data.lock}]);
    }

    selectedChange = (data: any, e: any) => {
        let {setTargets, setTargetIds, targetIds, targets} = eventOperateStore;
        const targetDom = document.getElementById(data.compId);
        if (!targetDom || data.lock || data.hide) return;
        if (e.ctrlKey) {
            if (targetIds.includes(data.compId)) {
                const newTargetIds = targetIds.filter(id => id !== data.compId);
                setTargetIds(newTargetIds);
                const newTargets = targets.filter(target => target.id !== data.compId);
                setTargets(newTargets);
            } else {
                targetIds = [...targetIds, data.compId];
                targets = [...targets, targetDom];
                setTargetIds(targetIds);
                setTargets(targets);
            }
        } else {
            setTargetIds([data.compId]);
            setTargets([targetDom]);
        }
    }

    hideChange = (data: any) => {
        const {updateLayout} = designerStore;
        updateLayout && updateLayout([{id: data.compId, hide: data.hide}]);
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