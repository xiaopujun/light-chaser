import designerStore from "../../store/DesignerStore";
import scaleCore from "./ScaleCore";
import coordinate from "../coordinate/Coordinate";
import eventOperateStore from "../EventOperateStore";
import eventManager from "../core/EventManager";
import {KMMap} from "../keyboard-mouse/KeyboardMouse";

export const scaleConfig = {
    content: {},
    offsetX: 0,
    offsetY: 0,
}

export const doScale = (e: any) => {
    //缩放拖拽不能同时进行
    if (KMMap.rightClick) return;
    const {setScale} = eventOperateStore;
    //缩放画布
    scaleCanvas(e);
    //缩放标尺
    eventManager.emit('wheel', e);
    setScale(scaleCore.scale);
}

export const scaleCanvas = (e: any) => {
    let {canvasConfig: {width = 1920, height = 1080}} = designerStore;
    let type = 1;
    if (e.deltaY > 0)
        type = 0;
    scaleCore.compute(type);
    const origin = {
        x: (scaleCore.ratio - 1) * width * 0.5,
        y: (scaleCore.ratio - 1) * height * 0.5
    };
    // 计算偏移量
    coordinate.x -= (scaleCore.ratio - 1) * (e.clientX - scaleConfig.offsetX - coordinate.x) - origin.x;
    coordinate.y -= (scaleCore.ratio - 1) * (e.clientY - scaleConfig.offsetY - coordinate.y) - origin.y;
    (scaleConfig.content as any).style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scaleCore.scale + ')';
}