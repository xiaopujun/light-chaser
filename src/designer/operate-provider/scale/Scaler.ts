/**
 * 缩放器
 */
import coordinate from "../coordinate/Coordinate";
import scaleCore from "./ScaleCore";
import eventManager from "../core/EventManager";

class Scaler {
    content: any;
    contentW: number = 0;
    contentH: number = 0;
    offsetX: number = 0;
    offsetY: number = 0;

    constructor(content: any, width: number, height: number, offsetX?: number, offsetY?: number) {
        this.content = content;
        this.contentW = width;
        this.contentH = height;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
    }


    init = () => {
        if (!this.content)
            return;
        this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(1)';
        //注册鼠标滚轮事件
        eventManager.register('wheel', (e: any) => {
            const origin = {
                x: (scaleCore.ratio - 1) * this.contentW * 0.5,
                y: (scaleCore.ratio - 1) * this.contentH * 0.5
            };
            // 计算偏移量
            coordinate.x -= (scaleCore.ratio - 1) * (e.clientX - this.offsetX - coordinate.x) - origin.x;
            coordinate.y -= (scaleCore.ratio - 1) * (e.clientY - this.offsetY - coordinate.y) - origin.y;
            this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scaleCore.scale + ')';
        });
    }
}

export default Scaler;