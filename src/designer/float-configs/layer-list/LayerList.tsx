import {Component} from 'react';
import './LayerList.less';
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import {observer} from "mobx-react";
import FloatPanel from "../common/FloatPanel";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import Input from "../../../ui/input/Input";
import layerBuilder from "./LayerBuilder";
import {MovableItemType} from "../../operate-provider/movable/types";
import LayerUtil from "./util/LayerUtil";

class LayerList extends Component {

    floatPanelRef: FloatPanel | null = null;

    layerItemsContainerRef: HTMLDivElement | null = null;

    componentDidMount() {
        this.floatPanelRef?.panelRef?.addEventListener("click", this.cancelSelected);
    }

    componentWillUnmount() {
        this.floatPanelRef?.panelRef?.removeEventListener("click", this.cancelSelected);
    }

    cancelSelected = (e: any) => {
        if (!this.floatPanelRef) return;
        const {panelRef} = this.floatPanelRef;
        if (!panelRef) return;
        if (panelRef.contains(e.target as Node)
            && !this.layerItemsContainerRef?.contains(e.target as Node)) {
            const {setTargetIds, targetIds} = eventOperateStore;
            if (targetIds.length > 0)
                setTargetIds([]);
        }
    }

    onClose = () => {
        const {setVisible} = layerListStore;
        setVisible && setVisible(false);
    }

    searchLayer = (data: string | number) => {
        const {setContent} = layerListStore;
        setContent && setContent(data as string);
    }

    buildLayerList = () => {
        const {layoutConfigs} = designerStore;
        const {searchContent} = layerListStore;
        if (!searchContent || searchContent === '')
            return layerBuilder.buildLayerList(layoutConfigs);
        let filterLayer: Record<string, any> = {};
        if (searchContent === ':hide') {
            //仅过展示隐藏的图层
            Object.values(layoutConfigs).forEach((item: MovableItemType) => {
                if (item.hide && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        } else if (searchContent === ':lock') {
            //仅过展示锁定的图层
            Object.values(layoutConfigs).forEach((item: MovableItemType) => {
                if (item.lock && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        } else {
            Object.values(layoutConfigs).forEach((item: MovableItemType) => {
                if (item.name?.includes(searchContent) && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        }
        //补充分组图层
        const groupLayerId = LayerUtil.findPathGroupLayer(Object.keys(filterLayer));
        groupLayerId.forEach((id: string) => {
            filterLayer[id] = layoutConfigs[id];
        });
        return layerBuilder.buildLayerList(filterLayer);
    }

    render() {
        return (
            <FloatPanel ref={ref => this.floatPanelRef = ref} title={'图层'} onClose={this.onClose}
                        initPosition={{x: 250, y: -window.innerHeight + 50}}
                        className={'layer-list'}>
                <div className={'list-search'}>
                    <Input placeholder="搜索图层" onChange={this.searchLayer}/>
                </div>
                <div className={'layer-items'}>
                    <div ref={ref => this.layerItemsContainerRef = ref}>
                        {this.buildLayerList()}
                    </div>
                </div>
            </FloatPanel>
        );
    }
}

export default observer(LayerList);