import AbstractDrag from "./AbstractDrag";
import eventManager from "../core/EventManager";
import eventOperateStore from "../EventOperateStore";
import {KMMap} from "../keyboard-mouse/KeyboardMouse";
import coordinate from "../coordinate/Coordinate";
import scaleCore from "../scale/ScaleCore";

class CanvasDragger extends AbstractDrag {

    constructor(target: any) {
        super();
        if (!target)
            throw new Error("target is null, cannot drag");
        this.target = target;
        this.registerDragger();
    }

    protected onDragEnd = (): void => {
        eventManager.register('pointerup', (e: any) => {
            if (e.button === 2) {
                this.target.releasePointerCapture(e.pointerId);
                eventManager.unregister('pointermove', this.onDragMove);
            }
        });
    }

    protected onDragMove = (e: any): void => {
        const {setPointerTarget} = eventOperateStore;
        setPointerTarget(e.target)
        if (KMMap.rightClick) {
            coordinate.x += e.movementX;
            coordinate.y += e.movementY;
            const {scale} = scaleCore;
            this.target.style.transform = 'translate3d(' + coordinate.x + 'px, ' + coordinate.y + 'px, 0) scale(' + scale + ')';
        }
    }

    protected onDragStart = (): void => {
        eventManager.register('pointerdown', (e: any) => {
            if (e.button === 2) {
                this.target.setPointerCapture(e.pointerId);
                this.position = {x: e.clientX, y: e.clientY};
                eventManager.register('pointermove', this.onDragMove);
            }
        });
    }

    destroy = () => {
        eventManager.unregister('pointerdown');
        eventManager.unregister('pointermove');
        eventManager.unregister('pointerup');
    }

}

export default CanvasDragger;