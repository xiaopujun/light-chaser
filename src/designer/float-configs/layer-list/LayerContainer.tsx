import {Component} from 'react';
import LayerComponent from "./LayerComponent";
import layerListStore from "./LayerListStore";
import {LayerItemDataProps} from "./item/LayerItem";

export interface LayerContainerProps {
    item: LayerItemDataProps;
}

class LayerContainer extends Component<LayerContainerProps> {

    layerContainerRef: HTMLDivElement | null = null;

    componentDidMount() {
        const {layerInstanceMap} = layerListStore;
        const {item} = this.props as LayerContainerProps;
        new LayerComponent().create(this.layerContainerRef!, item).then(r => {
            layerInstanceMap[item.compId!] = r;
        });
    }

    render() {
        const {item} = this.props as LayerContainerProps;
        return (
            <div id={item.compId + ''} className={'layer-item-container'}
                 ref={ref => this.layerContainerRef = ref}/>
        );
    }
}

export default LayerContainer;