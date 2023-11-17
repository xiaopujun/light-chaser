import {Component} from 'react';
import './LayerList.less';
import layerListStore from "./LayerListStore";
import designerStore from "../../store/DesignerStore";
import {observer} from "mobx-react";
import FloatPanel from "../common/FloatPanel";
import eventOperateStore from "../../operate-provider/EventOperateStore";
import Input from "../../../ui/input/Input";
import LayerBuilder from "./LayerBuilder";

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

    render() {
        const {layoutConfigs} = designerStore;
        const layerDom = new LayerBuilder().buildLayerList(layoutConfigs);
        return (
            <FloatPanel ref={ref => this.floatPanelRef = ref} title={'图层'} onClose={this.onClose}
                        initPosition={{x: 250, y: -window.innerHeight + 50}}
                        className={'layer-list'}>
                <div className={'list-search'}>
                    <Input placeholder="搜索图层" onChange={this.searchLayer}/>
                </div>
                <div className={'layer-items'}>
                    <div ref={ref => this.layerItemsContainerRef = ref}>
                        {layerDom}
                    </div>
                </div>
            </FloatPanel>
        );
    }
}

export default observer(LayerList);