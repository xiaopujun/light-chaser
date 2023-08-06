import React, {Component} from 'react';
import LayerComponent from "./LayerComponent";
import layerListStore from "./LayerListStore";
import {LayerItemProps} from "./LayerItem";

export interface LayerContainerProps {
    item: LayerItemProps;
}

class LayerContainer extends Component<LayerContainerProps> {

    layerContainerRef: HTMLDivElement | null = null;

    componentDidMount() {
        const {layerInstanceMap} = layerListStore;
        const {item} = this.props as LayerContainerProps;
        new LayerComponent().create(this.layerContainerRef!, item).then(r => {
            layerInstanceMap[item.data?.compId!] = r;
        });
    }

    render() {
        const {item} = this.props as LayerContainerProps;
        return (
            <div id={item.data?.compId + ''} className={'layer-item-container'}
                 ref={ref => this.layerContainerRef = ref}/>
        );
    }
}

export default LayerContainer;