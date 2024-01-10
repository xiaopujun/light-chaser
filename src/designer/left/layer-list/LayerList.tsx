import {Component} from 'react';
import './LayerList.less';
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import {observer} from "mobx-react";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import Input from "../../../ui/input/Input";
import layerBuilder from "./LayerBuilder";
import LayerUtil from "./util/LayerUtil";
import {ILayerItem} from "../../DesignerType";
import {MinusOutlined} from "@ant-design/icons";
import designerLeftStore from "../DesignerLeftStore";

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

    searchLayer = (data: string | number) => {
        const {setContent} = layerListStore;
        setContent && setContent(data as string);
    }

    buildLayerList = () => {
        const {layerConfigs} = designerStore;
        const {searchContent} = layerListStore;
        if (!searchContent || searchContent === '')
            return layerBuilder.buildLayerList(layerConfigs);
        let filterLayer: Record<string, any> = {};
        if (searchContent === ':hide') {
            //仅过展示隐藏的图层
            Object.values(layerConfigs).forEach((item: ILayerItem) => {
                if (item.hide && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        } else if (searchContent === ':lock') {
            //仅过展示锁定的图层
            Object.values(layerConfigs).forEach((item: ILayerItem) => {
                if (item.lock && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        } else {
            Object.values(layerConfigs).forEach((item: ILayerItem) => {
                if (item.name?.includes(searchContent) && item.type !== 'group')
                    filterLayer[item.id!] = item;
            });
        }
        //补充分组图层
        const groupLayerId = LayerUtil.findPathGroupLayer(Object.keys(filterLayer));
        groupLayerId.forEach((id: string) => {
            filterLayer[id] = layerConfigs[id];
        });
        return layerBuilder.buildLayerList(filterLayer);
    }

    render() {
        return (
            <div className={'layer-list'} ref={ref => this.layerListRef = ref}>
                <div className={'dl-ll-header'}>
                    <div className={'dl-ll-header-title'}>图层列表</div>
                    <div className={'dl-ll-header-operate'}><MinusOutlined onClick={() => {
                        const {setMenu} = designerLeftStore;
                        setMenu("");
                        const {rulerRef} = eventOperateStore;
                        rulerRef?.ruleWheel();
                    }}/></div>
                </div>
                <div className={'list-search'}>
                    <Input placeholder="搜索图层" onChange={this.searchLayer}/>
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