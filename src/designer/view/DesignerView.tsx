import {lazy, Suspense, useEffect} from 'react';
import './DesignerView.less';
import designerStore from "../store/DesignerStore";
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";
import DesignerLoaderFactory from "../loader/DesignerLoaderFactory";
import layerBuilder from "../left/layer-list/LayerBuilder";
import {DesignerMode, SaveType} from "../DesignerType.ts";
import URLUtil from "../../utils/URLUtil.ts";

const ScreenFit = lazy(() => import('../../framework/screen-fit/ScreenFit.tsx'));

const DesignerView = observer(() => {

    useEffect(() => {
        const {saveType, id} = URLUtil.parseUrlParams();
        DesignerLoaderFactory.getLoader(DesignerMode.VIEW).load(id, saveType as SaveType);
    }, []);

    const {loaded, canvasConfig: {width, height}, layerConfigs} = designerStore!;
    if (!loaded)
        return <Loading/>;
    return (
        <Suspense fallback={<Loading/>}>
            <ScreenFit width={width!} height={height!}>
                <div style={{width, height, background: 'black', overflow: 'hidden', position: "relative"}}>
                    {layerBuilder.buildCanvasComponents(layerConfigs)}
                </div>
            </ScreenFit>
        </Suspense>
    );
});

export default DesignerView;