/**
 * 缩放器
 */
import coordinate from "../coordinate/Coordinate";
import scaleCore from "./ScaleCore";
import eventManager from "../core/EventManager";
import designerStore from "../../store/DesignerStore";

class Scaler {
    content: any;
    offsetX: number = 0;
    offsetY: number = 0;

    constructor(content: any, offsetX?: number, offsetY?: number) {
        this.content = content;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
    }

    init = () => {
        if (!this.content)
            return;
        this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(1)';
        //注册鼠标滚轮事件
        eventManager.register('wheel', (e: any) => {
            let {canvasConfig: {width = 1920, height = 1080}} = designerStore;
            const origin = {
                x: (scaleCore.ratio - 1) * width * 0.5,
                y: (scaleCore.ratio - 1) * height * 0.5
            };
            // 计算偏移量
            coordinate.x -= (scaleCore.ratio - 1) * (e.clientX - this.offsetX - coordinate.x) - origin.x;
            coordinate.y -= (scaleCore.ratio - 1) * (e.clientY - this.offsetY - coordinate.y) - origin.y;
            this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scaleCore.scale + ')';
        });
    }

    destroy = () => {
        eventManager.unregister('wheel');
    }
}

export default Scaler;