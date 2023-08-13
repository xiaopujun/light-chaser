import AbstractDrag from "./AbstractDrag";
import eventManager from "../core/EventManager";
import {KMMap} from "../keyboard-mouse/KeyboardMouse";
import scaleCore from "../scale/ScaleCore";

class CanvasDragger extends AbstractDrag {

    //设置为静态属性，以供画布的拖拽和缩放信息共用
    public static position: { x: number, y: number } = {x: 0, y: 0};

    constructor(target: any, initPosition?: { x: number, y: number }) {
        super();
        if (!target)
            throw new Error("target is null, cannot drag");
        this.target = target;
        CanvasDragger.position = initPosition || CanvasDragger.position;
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
            CanvasDragger.position.x += e.movementX;
            CanvasDragger.position.y += e.movementY;
            const {scale} = scaleCore;
            this.target.style.transform = 'translate3d(' + CanvasDragger.position.x + 'px, ' + CanvasDragger.position.y + 'px, 0) scale(' + scale + ')';
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