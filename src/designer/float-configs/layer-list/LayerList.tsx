import React, {Component} from 'react';
import './LayerList.less';
import {Input} from "antd";
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import LayerItem from "./LayerItem";
import {observer} from "mobx-react";
import FloatPanel from "../common/FloatPanel";

class LayerList extends Component {

    onClose = () => {
        const {setVisible} = layerListStore;
        setVisible && setVisible(false);
    }

    searchLayer = (e: any) => {
        console.log(e.target.value);

    }

    buildLayerList = () => {
        const {layoutConfigs} = designerStore;
        return Object.values(layoutConfigs).sort((a: any, b: any) => a.order - b.order).map((item: any, index) => {
            return <LayerItem key={index + ''} name={item.name} lock={item.locked} hide={item.hide}/>
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
                {this.buildLayerList()}
            </FloatPanel>
        );
    }
}

export default observer(LayerList);