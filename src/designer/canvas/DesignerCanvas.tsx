import React, {PureComponent} from 'react';
import {observer} from "mobx-react";
import designerStore from "../store/DesignerStore";
import rightStore from "../right/RightStore";
import DesignerRuler from "./DesignerRuler";
import DesignerContainer from "../operate-provider/DesignerContainer";
import GroupMovable from "../operate-provider/movable/DesignerMovable";
import GroupSelectable from "../operate-provider/movable/DesignerSelectable";
import ContextMenu from "../operate-provider/right-click-menu/ContextMenu";
import HotKey from "../operate-provider/hot-key/HotKey";
import {hotkeyConfigs} from "../operate-provider/hot-key/HotKeyConfig";
import {DesignerDragScaleContainer} from "./DesignerDragScaleContainer";
import eventOperateStore from "../operate-provider/EventOperateStore";
import layerBuilder from "../left/layer-list/LayerBuilder";
import LayerUtil from "../left/layer-list/util/LayerUtil";

/**
 * 设计器画布
 */
class DesignerCanvas extends PureComponent {

    updateActive = (e: React.MouseEvent) => {
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
        const {layerConfigs} = designerStore!;
        const layer = layerConfigs[layerId];
        if (layerId === activeElem.id) return;
        activeConfig(layerId, layer.type!);
    }

    render() {
        const {layerConfigs} = designerStore!;
        return (
            <>
                <DesignerContainer>
                    <GroupSelectable>
                        <DesignerRuler>
                            <DesignerDragScaleContainer onDoubleClick={this.updateActive}>
                                <GroupMovable>
                                    {layerBuilder.buildCanvasComponents(layerConfigs)}
                                </GroupMovable>
                            </DesignerDragScaleContainer>
                        </DesignerRuler>
                    </GroupSelectable>
                </DesignerContainer>
                <ContextMenu/>
                <HotKey handlerMapping={hotkeyConfigs}/>
            </>
        );
    }
}

export default observer(DesignerCanvas);

