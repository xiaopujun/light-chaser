import shortcutKey from "./ShortcutKey";
import eventOperateStore from "./EventOperateStore";
import coordinate from "./Coordinate";

/**
 * 缩放器
 */
class Dragger {
    dom: any = null;
    isPointerdown: boolean = false; // 鼠标指针是否按下
    point: { x: number, y: number } = {x: 0, y: 0}; // 第一个点坐标
    diff: { x: number, y: number } = {x: 0, y: 0}; // 相对于上一次pointermove移动差值
    lastPointermove: { x: number, y: number } = {x: 0, y: 0}; // 用于计算diff
    spaceDown: boolean = false;
    callback: Function = () => {
    };

    constructor(dom: any, callback?: Function) {
        this.dom = dom;
        this.callback = callback || this.callback;
    }

    registerDragEvent = () => {
        if (!this.dom)
            return;
        this.dom.addEventListener('pointerdown', (e: any) => {
            if (shortcutKey._space) {
                shortcutKey._mouseLeft = true;
                this.dom.setPointerCapture(e.pointerId);
                this.point = {x: e.clientX, y: e.clientY};
                this.lastPointermove = {x: e.clientX, y: e.clientY};
            }
        });

        this.dom.addEventListener('pointermove', (e: any) => {
            if (shortcutKey._space) {
                if (shortcutKey._mouseLeft) {
                    const {scale} = eventOperateStore;
                    const current1 = {x: e.clientX, y: e.clientY};
                    this.diff.x = current1.x - this.lastPointermove.x;
                    this.diff.y = current1.y - this.lastPointermove.y;
                    this.lastPointermove = {x: current1.x, y: current1.y};
                    coordinate.x += this.diff.x;
                    coordinate.y += this.diff.y;
                    this.dom.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scale + ')';
                }
                e.preventDefault();
            }
        });

        this.dom.addEventListener('pointerup', () => {
            if (shortcutKey._space) {
                if (shortcutKey._mouseLeft) {
                    shortcutKey._mouseLeft = false;
                }
            }
        });

        this.dom.addEventListener('pointercancel', () => {
            if (shortcutKey._space) {
                if (shortcutKey._mouseLeft) {
                    shortcutKey._mouseLeft = false;
                }
            }
        });
    }
}

export default Dragger;