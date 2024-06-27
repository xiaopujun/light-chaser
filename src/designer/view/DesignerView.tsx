import {lazy, Suspense, useEffect} from 'react';
import './DesignerView.less';
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import layerBuilder from "../left/layer-list/LayerBuilder.ts";
import {DesignerMode, SaveType} from "../DesignerType.ts";
import '../../designer/resource/font/FontGlobal.css';
import ScaleAction from "../../framework/core/ScaleAction.ts";
import {
    viewBpExecutor,
    viewCanvasManager,
    viewDesignerManager,
    viewLayerManager
} from "../loader/ViewDesignerLoader.ts";

const ScreenFit = lazy(() => import('../../framework/screen-fit/ScreenFit.tsx'));


export interface DesignerViewProps {
    id: string;
    type: SaveType;
}

const DesignerView = observer((props: DesignerViewProps) => {

    const {id, type} = props;

    useEffect(() => {
        DesignerLoaderFactory.getLoader(DesignerMode.VIEW).load(id, type);
    }, []);

    const {loaded} = viewDesignerManager;
    const {canvasConfig: {width, height, adaptationType}} = viewCanvasManager
    if (!loaded)
        return <Loading/>;
    return (
        <Suspense fallback={<Loading/>}>
            <ScreenFit width={width!} height={height!} mode={adaptationType}
                       scaleChange={(xScale, yScale) => {
                           ScaleAction.doScale(xScale, yScale)
                       }}>
                <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
                    {layerBuilder.buildCanvasComponents(viewLayerManager, viewBpExecutor)}
                </div>
            </ScreenFit>
        </Suspense>
    );
});

export default DesignerView;