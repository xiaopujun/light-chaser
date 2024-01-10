import {ScaleCore} from "../../designer/operate-provider/scale/ScaleCore";
import {IPoint} from "../../blueprint/store/BPStore";

export interface DragScaleData {
    scale: number;
    ratio: number;
    position: IPoint;
}

export interface DragScaleProviderParams {
    container: HTMLDivElement | null;
    content: HTMLDivElement | null;
    position?: IPoint;
    dragCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    dragStartCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    dragEndCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    scaleCallback?: (dsData: DragScaleData, e: WheelEvent) => void;
}

/**
 * 拖拽缩放容器，独立提供拖拽与缩放功能。
 * 1.拖拽画布统一操作方式为长按鼠标右键
 * 2.缩放画布统一操作方式alt+鼠标滚轮
 * 上述两种操作的相关事件均在此组件内部完成（除缩放逻辑外，缩放逻辑调用外部方法获取scale比例）
 *
 * 主编辑器、蓝图编辑器均使用该类提供拖拽缩放功能
 */
export default class DragScaleProvider {
    private container: HTMLDivElement | null = null;
    private content: HTMLDivElement | null = null;
    private readonly position: IPoint = {x: 0, y: 0};
    private readonly dragCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    private readonly scaleCallback?: (dsData: DragScaleData, e: WheelEvent) => void;
    private readonly dragStartCallback?: (dsData: DragScaleData, e: PointerEvent) => void;
    private readonly dragEndCallback?: (dsData: DragScaleData, e: PointerEvent) => void;

    public scaleCore: ScaleCore = new ScaleCore();

    constructor(params: DragScaleProviderParams) {
        const {
            container, content, position,
            dragCallback, scaleCallback, dragStartCallback, dragEndCallback
        } = params;
        this.container = container;
        this.content = content;
        if (position)
            this.position = position;
        if (dragCallback)
            this.dragCallback = dragCallback;
        if (scaleCallback)
            this.scaleCallback = scaleCallback;
        if (dragStartCallback)
            this.dragStartCallback = dragStartCallback;
        if (dragEndCallback)
            this.dragEndCallback = dragEndCallback;
        //注册拖拽
        this.registerDrag();
        //注册缩放
        this.registerScale();
    }

    /************************事件、变量销毁************************/
    public destroy() {
        this.container?.removeEventListener('pointerdown', this.pointerDown);
        this.container?.removeEventListener('pointerup', this.pointerUp);
        this.container?.removeEventListener('wheel', this.doWheel);
        this.container?.removeEventListener('contextmenu', this.contextMenu);
        this.container = null;
        this.content = null;
    }

    /************************注册拖拽事件************************/
    private registerDrag() {
        //初始化被拖拽对象位置
        this.content!.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
        //阻止系统右键菜单显示
        this.container?.addEventListener("contextmenu", this.contextMenu)
        //监听拖拽开始
        this.onDragStart();
        //监听拖拽结束
        this.onDragEnd();
    }

    private contextMenu = (e: MouseEvent): void => e.preventDefault();

    private onDragStart = (): void => this.container?.addEventListener('pointerdown', this.pointerDown);

    private onDragMove = (e: PointerEvent): void => {
        if (e.buttons === 2) {
            this.position.x += e.movementX;
            this.position.y += e.movementY;
            this.content!.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
            if (this.dragCallback) {
                const {scale, ratio} = this.scaleCore;
                this.dragCallback({scale, ratio, position: this.position}, e);
            }
        }
    }

    private onDragEnd = (): void => this.container?.addEventListener('pointerup', this.pointerUp);

    private pointerDown = (e: PointerEvent): void => {
        if (e.button === 2) {
            //设置鼠标捕获，当鼠标移出视口外时，仍然能够监听到鼠标移动事件
            this.container?.setPointerCapture(e.pointerId);
            //监听拖拽移动
            this.container?.addEventListener('pointermove', this.onDragMove);
            if (this.dragStartCallback) {
                const {scale, ratio} = this.scaleCore;
                this.dragStartCallback({scale, ratio, position: this.position}, e);
            }
        }
    }

    private pointerUp = (e: PointerEvent): void => {
        if (e.button === 2) {
            this.container?.releasePointerCapture(e.pointerId);
            //取消拖拽移动监听
            this.container?.removeEventListener('pointermove', this.onDragMove);
            if (this.dragEndCallback) {
                const {scale, ratio} = this.scaleCore;
                this.dragEndCallback({scale, ratio, position: this.position}, e);
            }
        }
    }


    /************************注册缩放事件************************/
    private registerScale = (): void => this.container?.addEventListener('wheel', this.doWheel);

    private doWheel = (e: WheelEvent): void => {
        if (e.altKey && e.buttons !== 2) {
            //计算缩放比例
            this.scaleCore.compute(e.deltaY > 0 ? 0 : 1);
            const {x: offSetX, y: offSetY} = this.container!.getBoundingClientRect();
            //执行缩放
            const {width, height} = this.content?.style!;
            this.position.x = this.position.x - ((this.scaleCore.ratio - 1) * (e.clientX - offSetX - this.position.x - parseFloat(width) * 0.5));
            this.position.y = this.position.y - ((this.scaleCore.ratio - 1) * (e.clientY - offSetY - this.position.y - parseFloat(height) * 0.5));
            this.content!.style.transform = 'translate3d(' + this.position.x + 'px, ' + this.position.y + 'px, 0) scale(' + this.scaleCore.scale + ')';
            //执行回调
            if (this.scaleCallback) {
                const {scale, ratio} = this.scaleCore;
                this.scaleCallback({scale, ratio, position: this.position}, e);
            }
        }
    }

}



