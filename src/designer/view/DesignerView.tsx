import viewDesignerLoader from "../loader/ViewDesignerLoader.ts";
import {lazy, Suspense, useEffect} from 'react';
import './DesignerView.less';
import layerManager from "../manager/LayerManager.ts";
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";
import layerBuilder from "../left/layer-list/LayerBuilder";
import {SaveType} from "../DesignerType.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import designerManager from "../manager/DesignerManager.ts";
import '../../designer/resource/font/FontGlobal.css';
import ScaleAction from "../../framework/core/ScaleAction.ts";

const ScreenFit = lazy(() => import('../../framework/screen-fit/ScreenFit.tsx'));


export interface DesignerViewProps {
    id: string;
    type: SaveType;
}

const DesignerView = observer((props: DesignerViewProps) => {

    const {id, type} = props;

    useEffect(() => {
        viewDesignerLoader.load(id, type);
    }, []);

    const {layerConfigs} = layerManager!;
    const {loaded} = designerManager;
    const {canvasConfig: {width, height, adaptationType}} = canvasManager
    if (!loaded)
        return <Loading/>;

    const canvasDom = <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
        {layerBuilder.buildCanvasComponents(layerConfigs)}
    </div>

    return (
        <Suspense fallback={<Loading/>}>
            {adaptationType && adaptationType === 'none' ? canvasDom :
                <ScreenFit width={width!} height={height!} mode={adaptationType}
                           scaleChange={(xScale, yScale) => {
                               ScaleAction.doScale(xScale, yScale)
                           }}>{canvasDom}</ScreenFit>}
        </Suspense>
    );
});

export default DesignerView;