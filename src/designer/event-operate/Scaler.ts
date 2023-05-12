/**
 * 缩放器
 */
import shortcutKey from "./ShortcutKey";
import eventOperateStore from "./EventOperateStore";
import coordinate from "./Coordinate";
import scaleCore from "../../framework/scale/ScaleCore";
import eventManager from "../../framework/event/EventManager";

class Scaler {
    container: any;
    content: any;
    contentW: number = 0;
    contentH: number = 0;
    minScale: number = 0.1; //最小缩放倍数
    maxScale: number = 10;  //最大缩放倍数
    callback: Function = () => {
    };

    constructor(container: any, content: any, w: number, h: number, min: number, max: number, callback?: Function) {
        this.container = container;
        this.content = content;
        this.contentW = w;
        this.contentH = h;
        this.minScale = min;
        this.maxScale = max;
        this.callback = callback || this.callback;
    }


    registerScaleEvent = () => {
        if (!this.container || !this.content)
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

            this.callback && this.callback();
            setScale(scaleCore.scale);

        });

        /*this.container.addEventListener('wheel', (e: any) => {
                if (shortcutKey._space) {
                    let type = 1;
                    if (e.deltaY > 0)
                        type = 0;
                    scaleCore.compute(type);
                    const origin = {
                        x: (scaleCore.ratio - 1) * this.contentW * 0.5,
                        y: (scaleCore.ratio - 1) * this.contentH * 0.5
                    };
                    // 计算偏移量
                    coordinate.x -= (scaleCore.ratio - 1) * (e.clientX - 90 - coordinate.x) - origin.x;
                    coordinate.y -= (scaleCore.ratio - 1) * (e.clientY - 80 - coordinate.y) - origin.y;
                    this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scaleCore.scale + ')';
                    e.preventDefault();
                    this.callback && this.callback();
                    setScale(scaleCore.scale);
                }
            }
        );*/
    }
}

export default Scaler;