import {Component} from 'react';
import {observer} from "mobx-react";
import CompList from "./comp-list/CompList";
import compListStore from "./comp-list/CompListStore";
import layerListStore from "./layer-list/LayerListStore";
import LayerList from "./layer-list/LayerList";

class FloatConfigs extends Component {
    render() {
        const {visible: compListVisible} = compListStore;
        const {visible: layerListVisible} = layerListStore;
        return (
            <>
                {compListVisible && <CompList/>}
                {layerListVisible && <LayerList/>}
            </>
        );
    }
}

export default observer(FloatConfigs);