/**
 * 缩放器
 */
import shortcutKey from "./ShortcutKey";
import eventOperateStore from "./EventOperateStore";
import coordinate from "./Coordinate";

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
        //注册缩放元素缩放事件
        this.registerScaleEvent();
    }

    registerScaleEvent = () => {
        if (!this.container || !this.content)
            return;
        let {scale, setScale} = eventOperateStore;
        this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(1)';
        this.container.addEventListener('wheel', (e: any) => {
                if (shortcutKey._space) {
                    let ratio = 1.05;
                    // 缩小
                    if (e.deltaY > 0)
                        ratio = 1 / 1.05;
                    // 限制缩放倍数
                    const _scale = scale * ratio;
                    if (_scale > this.maxScale) {
                        ratio = this.maxScale / scale;
                        scale = this.maxScale;
                    } else if (_scale < this.minScale) {
                        ratio = this.minScale / scale;
                        scale = this.minScale;
                    } else {
                        scale = _scale;
                    }
                    const origin = {
                        x: (ratio - 1) * this.contentW * 0.5,
                        y: (ratio - 1) * this.contentH * 0.5
                    };
                    // 计算偏移量
                    coordinate.x -= (ratio - 1) * (e.clientX - 90 - coordinate.x) - origin.x;
                    coordinate.y -= (ratio - 1) * (e.clientY - 80 - coordinate.y) - origin.y;
                    this.content.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scale + ')';
                    e.preventDefault();
                    this.callback && this.callback();
                    setScale(scale);
                }
            }
        );
    }
}

export default Scaler;