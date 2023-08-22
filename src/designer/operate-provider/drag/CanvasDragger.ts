import AbstractDrag from "./AbstractDrag";
import eventManager from "../core/EventManager";
import {KMMap} from "../hot-key/KeyboardMouse";
import scaleCore from "../scale/ScaleCore";
import DragScaleProvider from "../DragScaleProvider";

class CanvasDragger extends AbstractDrag {

    constructor(target: any, initPosition?: { x: number, y: number }) {
        super();
        if (!target)
            throw new Error("target is null, cannot drag");
        this.target = target;
        DragScaleProvider.x = initPosition ? initPosition.x : 0;
        DragScaleProvider.y = initPosition ? initPosition.y : 0;
        this.registerDragger();
    }

    protected onDragEnd = (): void => {
        eventManager.register('pointerup', (e: any) => {
            if (e.button === 2) {
                try {
                    this.target.releasePointerCapture(e.pointerId);
                } catch (e) {
                    console.log(e);
                }
                eventManager.unregister('pointermove', this.onDragMove);
            }
        });
    }

    protected onDragMove = (e: any): void => {
        if (KMMap.rightClick) {
            DragScaleProvider.x += e.movementX;
            DragScaleProvider.y += e.movementY;
            const {scale} = scaleCore;
            //更新画布位置
            this.target.style.transform = 'translate3d(' + DragScaleProvider.x + 'px, ' + DragScaleProvider.y + 'px, 0) scale(' + scale + ')';
        }
    }

    protected onDragStart = (): void => {
        eventManager.register('pointerdown', (e: any) => {
            if (e.button === 2) {
                try {
                    this.target.setPointerCapture(e.pointerId);
                } catch (error) {
                    this.target.releasePointerCapture(e.pointerId);
                }
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