import {Component} from 'react';
import './DesignerView.less';
import designerStore from "../store/DesignerStore";
import {observer} from "mobx-react";
import Loading from "../../ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import ScreenFit from "../../framework/screen-fit/ScreenFit";
import layerBuilder from "../left/layer-list/LayerBuilder";

class DesignerView extends Component {

    constructor(props: any) {
        super(props);
        DesignerLoaderFactory.getLoader().load();
    }

    render() {
        let {loaded, canvasConfig: {width, height}, layerConfigs} = designerStore!;
        if (!loaded)
            return <Loading/>;
        return (
            <ScreenFit width={width!} height={height!}>
                <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
                    {layerBuilder.buildCanvasComponents(layerConfigs)}
                </div>
            </ScreenFit>
        );
    }
}

export default observer(DesignerView);