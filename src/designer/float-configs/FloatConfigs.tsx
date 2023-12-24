import {Component} from 'react';
import {observer} from "mobx-react";
import layerListStore from "../left/layer-list/LayerListStore";
import LayerList from "../left/layer-list/LayerList";
import CompList from "../left/compoent-lib/list/CompList";
import compListStore from "../left/compoent-lib/list/CompListStore";

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