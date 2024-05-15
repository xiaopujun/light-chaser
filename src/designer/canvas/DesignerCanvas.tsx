import React, {lazy, memo, Suspense} from 'react';
import {observer} from "mobx-react";
import layerManager from "../manager/LayerManager.ts";
import rightStore from "../right/RightStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {hotkeyConfigs} from "../operate-provider/hot-key/HotKeyConfig";
import layerBuilder from "../left/layer-list/LayerBuilder";
import LayerUtil from "../left/layer-list/util/LayerUtil";
import DesignerMovable from "../operate-provider/movable/DesignerMovable.tsx";
import Loading from "../../json-schema/ui/loading/Loading.tsx";
import SearchLayer from "../left/layer-list/search-layer/SearchLayer.tsx";

const DesignerContainer = lazy(() => import('../operate-provider/DesignerContainer'));
const DesignerRuler = lazy(() => import('./DesignerRuler'));
const GroupSelectable = lazy(() => import('../operate-provider/movable/DesignerSelectable'));
const ContextMenu = lazy(() => import('../operate-provider/right-click-menu/ContextMenu'));
const HotKey = lazy(() => import('../operate-provider/hot-key/HotKey'));
const DesignerDragScaleContainer = lazy(() => import('./DesignerDragScaleContainer'));


const DesignerCanvas = memo(observer(() => {

    const updateActive = (e: React.MouseEvent) => {
        let {targetIds} = eventOperateStore;
        const {activeElem, activeConfig} = rightStore;
        if (targetIds.length === 0) {
            activeConfig(null, "");
            return;
        }
        // 如果没有按下shift键，则进行分组场景下的计算，反之则直接选中激活组件配置
        if (!e.shiftKey)
            targetIds = LayerUtil.findTopGroupLayer(targetIds, true);
        if (targetIds.length !== 1) return;
        const layerId = targetIds[0];
        const {layerConfigs} = layerManager!;
        const layer = layerConfigs[layerId];
        if (layerId === activeElem.id) return;
        activeConfig(layerId, layer.type!);
    }

    const {layerConfigs} = layerManager!;
    console.log('渲染设计器画布')
    return (
        <Suspense fallback={<Loading/>}>
            <DesignerContainer>
                <GroupSelectable>
                    <DesignerRuler>
                        <DesignerDragScaleContainer onDoubleClick={updateActive}>
                            <DesignerMovable>
                                {layerBuilder.buildCanvasComponents(layerConfigs)}
                            </DesignerMovable>
                        </DesignerDragScaleContainer>
                    </DesignerRuler>
                </GroupSelectable>
            </DesignerContainer>
            <ContextMenu/>
            <HotKey handlerMapping={hotkeyConfigs}/>
            <SearchLayer/>
        </Suspense>
    );
}))


export default DesignerCanvas;

