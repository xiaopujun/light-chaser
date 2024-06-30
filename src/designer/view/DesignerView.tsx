import viewDesignerManager from "../manager/ViewDesignerManager.ts";
import {lazy, Suspense, useEffect} from 'react';
import './DesignerView.less';
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";
import {SaveType} from "../DesignerType.ts";
import '../../designer/resource/font/FontGlobal.css';
import ScaleAction from "../../framework/core/ScaleAction.ts";
import canvasRender from "../left/layer-list/CanvasRender.ts";

const ScreenFit = lazy(() => import('../../framework/screen-fit/ScreenFit.tsx'));

export interface DesignerViewProps {
    id: string;
    type: SaveType;
}

const DesignerView = observer((props: DesignerViewProps) => {


    useEffect(() => {
        viewDesignerManager.load(props.id);
    }, []);

    const {canvasConfig: {width, height, adaptationType}} = viewDesignerManager.canvasManager;
    if (!viewDesignerManager?.loaded)
        return <Loading/>;
    return (
        <Suspense fallback={<Loading/>}>
            <ScreenFit width={width!} height={height!} mode={adaptationType}
                       scaleChange={(xScale, yScale) => {
                           ScaleAction.doScale(xScale, yScale)
                       }}>
                <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
                    {canvasRender.buildCanvasComponents(viewDesignerManager.layerManager, viewDesignerManager.bpExecutor)}
                </div>
            </ScreenFit>
        </Suspense>
    );
});

export default DesignerView;