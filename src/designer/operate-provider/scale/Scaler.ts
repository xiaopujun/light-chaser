import designerStore from "../../store/DesignerStore";
import scaleCore from "./ScaleCore";
import eventOperateStore from "../EventOperateStore";
import eventManager from "../core/EventManager";
import {KMMap} from "../keyboard-mouse/KeyboardMouse";
import CanvasDragger from "../drag/CanvasDragger";

export const scaleConfig = {
    content: null,
    offsetX: 0,
    offsetY: 0,
}

export const doScale = (e: any) => {
    //如果仍处于拖拽过程中，则不进行缩放
    if (KMMap.rightClick) return;
    //计算缩放比例
    scaleCore.compute(e.deltaY > 0 ? 0 : 1);
    //缩放画布
    scaleCanvas(e);
    //缩放标尺
    eventManager.emit('wheel', e);
    const {setScale} = eventOperateStore;
    setScale(scaleCore.scale);
}

export const scaleCanvas = (e: any) => {
    let {canvasConfig: {width = 1920, height = 1080}} = designerStore;
    const origin = {
        x: (scaleCore.ratio - 1) * width * 0.5,
        y: (scaleCore.ratio - 1) * height * 0.5
    };
    // 计算偏移量
    CanvasDragger.position.x -= (scaleCore.ratio - 1) * (e.clientX - scaleConfig.offsetX - CanvasDragger.position.x) - origin.x;
    CanvasDragger.position.y -= (scaleCore.ratio - 1) * (e.clientY - scaleConfig.offsetY - CanvasDragger.position.y) - origin.y;
    (scaleConfig.content as any).style.transform = 'translate3d(' + CanvasDragger.position.x + 'px, ' + CanvasDragger.position.y + 'px, 0) scale(' + scaleCore.scale + ')';
}