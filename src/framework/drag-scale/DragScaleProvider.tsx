import {PointType} from "../../blueprint/types";
import {ScaleCore} from "../../designer/operate-provider/scale/ScaleCore";

export interface DragScaleProviderParams {
    container: HTMLDivElement | null;
    content: HTMLDivElement | null;
    position?: PointType;
    posOffset?: PointType;
    dragCallback?: (position: PointType, e: any) => void;
    scaleCallback?: (scale: number, ratio: number, e: any) => void;
}

/**
 * 拖拽缩放容器，独立提供拖拽与缩放功能。
 * 1.拖拽画布统一操作方式为长按鼠标右键
 * 2.缩放画布统一操作方式alt+鼠标滚轮
 * 上述两种操作的相关事件均在此组件内部完成（除缩放逻辑外，缩放逻辑调用外部方法获取scale比例）
 */
export default class DragScaleProvider {
    private container: HTMLDivElement | null = null;
    private content: HTMLDivElement | null = null;
    private position: PointType = {x: 0, y: 0};
    private posOffset: PointType = {x: 0, y: 0};
    private dragCallback?: (position: PointType, e: any) => void;
    private scaleCallback?: (scale: number, ratio: number, e: any) => void;

    public scaleCore: ScaleCore = new ScaleCore();

    constructor(params: DragScaleProviderParams) {
        const {container, content, position, posOffset, dragCallback, scaleCallback} = params;
        this.container = container;
        this.content = content;
        if (position)
            this.position = position;
        if (posOffset)
            this.posOffset = posOffset;
        if (dragCallback)
            this.dragCallback = dragCallback;
        if (scaleCallback)
            this.scaleCallback = scaleCallback;
        this.registerDrag();
        this.registerScale();
    }

    public destroy() {
        this.container?.removeEventListener('pointerdown', this.onDragStart);
        this.container?.removeEventListener('pointerup', this.onDragEnd);
        this.container?.removeEventListener('wheel', this.onWheel);
    }

    /************************注册拖拽事件************************/
    private registerDrag() {
        //阻止系统右键菜单显示
        this.container?.addEventListener("contextmenu", (e) => e.preventDefault())
        this.onDragStart();
        this.onDragEnd();
    }

    /************************注册缩放事件************************/
    private registerScale() {
        this.onWheel();
    }

    /*********************拖拽事件**********************/

    private onDragEnd = (): void => {
        this.container?.addEventListener('pointerup', (e: any) => {
            if (e.button === 2) {
                this.container?.releasePointerCapture(e.pointerId);
                this.container?.removeEventListener('pointermove', this.onDragMove);
            }
        });
    }

    private onDragMove = (e: any): void => {
        this.position.x += e.movementX;
        this.position.y += e.movementY;
        this.content!.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
        if (this.dragCallback)
            this.dragCallback(this.position, e);
    }

    private onDragStart = (): void => {
        this.container?.addEventListener('pointerdown', (e: any) => {
            if (e.button === 2) {
                this.container?.setPointerCapture(e.pointerId);
                this.container?.addEventListener('pointermove', this.onDragMove);
            }
        });
    }

    /*********************缩放事件**********************/
    private onWheel = (): void => {
        this.container?.addEventListener('wheel', (e: any) => {
            if (e.altKey && e.buttons !== 2) {
                //计算缩放比例
                this.scaleCore.compute(e.deltaY > 0 ? 0 : 1);
                //执行缩放
                const {width, height} = this.content?.style!;
                this.position.x = this.position.x - ((this.scaleCore.ratio - 1) * (e.clientX - this.posOffset.x - this.position.x - parseFloat(width) * 0.5));
                this.position.y = this.position.y - ((this.scaleCore.ratio - 1) * (e.clientY - this.posOffset.y - this.position.y - parseFloat(height) * 0.5));
                this.content!.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
                //执行回调
                if (this.scaleCallback)
                    this.scaleCallback(this.scaleCore.scale, this.scaleCore.ratio, e);
            }
        });
    }
}



