/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {ViewDesignerLoader} from "../loader/ViewDesignerLoader.ts";
import {lazy, Suspense, useEffect, useRef} from 'react';
import './DesignerView.less';
import layerManager from "../manager/LayerManager.ts";
import {observer} from "mobx-react";
import Loading from "../../json-schema/ui/loading/Loading";
import layerBuilder from "../left/layer-list/LayerBuilder";
import {DesignerMode, SaveType} from "../DesignerType.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import '../../designer/resource/font/FontGlobal.css';
import ScaleAction from "../../framework/core/ScaleAction.ts";
import {DesignerLoader} from "../loader/DesignerLoader.ts";

const ScreenFit = lazy(() => import('../../framework/screen-fit/ScreenFit.tsx'));


export interface DesignerViewProps {
    id: string;
    type: SaveType;
}

const DesignerView = observer((props: DesignerViewProps) => {

    const {id, type} = props;
    const loaderRef = useRef<DesignerLoader | null>(new ViewDesignerLoader(DesignerMode.VIEW));

    useEffect(() => {
        loaderRef.current?.load(id, type);
    }, []);

    const {layerConfigs} = layerManager!;
    const {canvasConfig: {width, height, adaptationType}} = canvasManager
    if (!loaderRef.current?.loaded)
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