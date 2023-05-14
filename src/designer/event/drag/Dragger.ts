import keyboardMouse from "../io/KeyboardMouse";
import eventOperateStore from "../EventOperateStore";
import coordinate from "../coordinate/Coordinate";
import eventManager from "../core/EventManager";

/**
 * 缩放器
 */
class Dragger {
    dom: any = null;
    point: { x: number, y: number } = {x: 0, y: 0}; // 第一个点坐标
    diff: { x: number, y: number } = {x: 0, y: 0}; // 相对于上一次pointermove移动差值
    lastPointermove: { x: number, y: number } = {x: 0, y: 0}; // 用于计算diff

    constructor(dom: any) {
        this.dom = dom;
    }

    init = () => {
        if (!this.dom)
            return;
        eventManager.register('pointerdown', (e: any) => {
            if (keyboardMouse.Space) {
                keyboardMouse.LeftClick = true;
                this.dom.setPointerCapture(e.pointerId);
                this.point = {x: e.clientX, y: e.clientY};
                this.lastPointermove = {x: e.clientX, y: e.clientY};
            }
        });
        eventManager.register('pointermove', (e: any) => {
            if (keyboardMouse.Space && keyboardMouse.LeftClick) {
                const {scale} = eventOperateStore;
                const current1 = {x: e.clientX, y: e.clientY};
                this.diff.x = current1.x - this.lastPointermove.x;
                this.diff.y = current1.y - this.lastPointermove.y;
                this.lastPointermove = {x: current1.x, y: current1.y};
                coordinate.x += this.diff.x;
                coordinate.y += this.diff.y;
                this.dom.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scale + ')';
                e.preventDefault();
            }
        });
        eventManager.register('pointerup', () => {
            if (keyboardMouse.Space && keyboardMouse.LeftClick)
                keyboardMouse.LeftClick = false;
        });
        eventManager.register('pointercancel', () => {
            if (keyboardMouse.Space && keyboardMouse.LeftClick)
                keyboardMouse.LeftClick = false;
        });
    }
}

export default Dragger;