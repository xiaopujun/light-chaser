import designerStore from "../../store/DesignerStore";
import scaleCore from "./ScaleCore";
import eventManager from "../core/EventManager";
import {KMMap} from "../hot-key/KeyboardMouse";
import footerStore from "../../footer/FooterStore";
import DragScaleProvider from "../DragScaleProvider";

export const doScale = (e: any) => {
    //如果仍处于拖拽过程中，则不进行缩放
    if (KMMap.rightClick) return;
    //计算缩放比例
    scaleCore.compute(e.deltaY > 0 ? 0 : 1);
    //缩放画布
    scaleCanvas(e);
    //缩放标尺
    eventManager.emit('wheel', e);
    //更新缩放比例显示信息
    const {setScale} = footerStore;
    setScale(scaleCore.scale);
}

export const scaleCanvas = (e: any) => {
    let {canvasConfig: {width = 1920, height = 1080}} = designerStore;
    const origin = {
        x: (scaleCore.ratio - 1) * width * 0.5,
        y: (scaleCore.ratio - 1) * height * 0.5
    };
    // 计算偏移量
    DragScaleProvider.x -= (scaleCore.ratio - 1) * (e.clientX - DragScaleProvider.offsetX - DragScaleProvider.x) - origin.x;
    DragScaleProvider.y -= (scaleCore.ratio - 1) * (e.clientY - DragScaleProvider.offsetY - DragScaleProvider.y) - origin.y;
    DragScaleProvider.providerRef!.style.transform = 'translate3d(' + DragScaleProvider.x + 'px, ' + DragScaleProvider.y + 'px, 0) scale(' + scaleCore.scale + ')';
}