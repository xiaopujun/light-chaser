import React, {Component} from 'react';
import './LayerList.less';
import {Input} from "antd";
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import LayerItem from "./LayerItem";
import {observer} from "mobx-react";
import FloatPanel from "../common/FloatPanel";
import eventOperateStore from "../../operate-provider/EventOperateStore";

class LayerList extends Component {

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
    hideChange = (compId: string, data: boolean) => {
        const {updateLayout} = designerStore;
        updateLayout && updateLayout([{id: compId, hide: data}]);
    }

    buildLayerList = () => {
        const {layoutConfigs} = designerStore;
        return Object.values(layoutConfigs).sort((a: any, b: any) => b.order - a.order).map((item: any, index) => {
            return <LayerItem key={index + ''}
                              data={{name: item.name, lock: item.locked, hide: item.hide, compId: item.id}}
                              lockChange={this.lockChange}
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