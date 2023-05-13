/**
 * 缩放器
 */
import eventOperateStore from "./EventOperateStore";
import coordinate from "./Coordinate";
import scaleCore from "../../framework/scale/ScaleCore";
import eventManager from "../../framework/event/EventManager";

class Scaler {
    container: any;
    content: any;
    contentW: number = 0;
    contentH: number = 0;

    constructor(content: any, w: number, h: number) {
        this.content = content;
        this.contentW = w;
        this.contentH = h;
    }


    registerScaleEvent = () => {
        if (!this.content)
            return;
        let {setScale} = eventOperateStore;
        this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(1)';
        //注册鼠标滚轮事件
        eventManager.register('wheel', (e: any) => {
            const origin = {
                x: (scaleCore.ratio - 1) * this.contentW * 0.5,
                y: (scaleCore.ratio - 1) * this.contentH * 0.5
            };
            // 计算偏移量
            coordinate.x -= (scaleCore.ratio - 1) * (e.clientX - 90 - coordinate.x) - origin.x;
            coordinate.y -= (scaleCore.ratio - 1) * (e.clientY - 80 - coordinate.y) - origin.y;
            this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scaleCore.scale + ')';
            setScale(scaleCore.scale);
        });
    }
}

export default Scaler;