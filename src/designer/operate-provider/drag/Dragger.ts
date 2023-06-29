import {KMMap} from "../keyboard-mouse/KeyboardMouse";
import coordinate from "../coordinate/Coordinate";
import eventManager from "../core/EventManager";
import scaleCore from "../scale/ScaleCore";
import eventOperateStore from "../EventOperateStore";

/**
 * 缩放器
 */
class Dragger {
    dom: any = null;
    point: { x: number, y: number } = {x: 0, y: 0}; // 第一个点坐标

    constructor(dom: any) {
        this.dom = dom;
    }

    init = () => {
        if (!this.dom)
            return;
        eventManager.register('pointerdown', (e: any) => {
            if (e.button === 2) {
                this.dom.setPointerCapture(e.pointerId);
                this.point = {x: e.clientX, y: e.clientY};
            }
        });
        eventManager.register('pointerup', (e: any) => {
            if (e.button === 2)
                this.dom.releasePointerCapture(e.pointerId);
        });
        eventManager.register('pointermove', (e: any) => {
            const {setPointerTarget} = eventOperateStore;
            setPointerTarget(e.target)
            if (KMMap.rightClick) {
                coordinate.x += e.movementX;
                coordinate.y += e.movementY;
                const {scale} = scaleCore;
                this.dom.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scale + ')';
            }
        });
    }

    destroy = () => {
        eventManager.unregister('pointerdown');
        eventManager.unregister('pointermove');
        eventManager.unregister('pointerup');
    }
}

export default Dragger;