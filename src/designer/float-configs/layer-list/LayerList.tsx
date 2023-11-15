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
        if (panelRef.contains(e.target as Node) && !(e.target as HTMLElement).classList.contains("layer-item")) {
            const {setTargets, targetIds} = eventOperateStore;
            if (targetIds.length > 0)
                setTargets([]);
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

    // buildLayerList = () => {
    //     const {layoutConfigs} = designerStore;
    //     const {targetIds} = eventOperateStore;
    //     let {searchContent} = layerListStore;
    //     //判断是否是命令模式
    //     const commandMode = searchContent.startsWith(":");
    //     if (commandMode) searchContent = searchContent.substring(1);
    //     console.time('图层加载')
    //     const res = Object.values(layoutConfigs)
    //         .filter((item: MovableItemType) => {
    //             if (commandMode) {
    //                 //使用命令模式过滤
    //                 if (searchContent.trim() === "hide")
    //                     return item.hide;
    //                 else if (searchContent.trim() === "lock")
    //                     return item.lock;
    //             } else
    //                 return item.name?.includes(searchContent);
    //             return false;
    //         })
    //         .sort((a: MovableItemType, b: MovableItemType) => b.order! - a.order!)
    //         .map((item: MovableItemType) => {
    //             let _props: LayerItemDataProps = {
    //                 name: item.name,
    //                 lock: item.lock,
    //                 hide: item.hide,
    //                 compId: item.id,
    //                 type: item.type,
    //                 selected: targetIds.includes(item.id!)
    //             }
    //             return <LayerContainer key={item.id} item={_props}/>
    //         });
    //     console.timeEnd('图层加载')
    //     return res;
    // }

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
                    {layerDom}
                </div>
            </FloatPanel>
        );
    }
}

export default observer(LayerList);