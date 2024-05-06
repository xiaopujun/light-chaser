import {lazy, Suspense, useEffect} from 'react';
import './DesignerView.less';
import layerManager from "../manager/LayerManager.ts";
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import layerBuilder from "../left/layer-list/LayerBuilder";
import {DesignerMode, SaveType} from "../DesignerType.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import designerManager from "../manager/DesignerManager.ts";
import '../../designer/resource/font/FontGlobal.css';

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

    const {layerConfigs} = layerManager!;
    const {loaded} = designerManager;
    const {canvasConfig: {width, height, adaptationType}} = canvasManager
    if (!loaded)
        return <Loading/>;
    return (
        <Suspense fallback={<Loading/>}>
            <ScreenFit width={width!} height={height!} mode={adaptationType}>
                <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
                    {layerBuilder.buildCanvasComponents(layerConfigs)}
                </div>
            </ScreenFit>
        </Suspense>
    );
});

export default DesignerView;