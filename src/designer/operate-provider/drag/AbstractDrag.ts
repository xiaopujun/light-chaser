abstract class AbstractDrag {
    //被拖拽的目标
    protected target: HTMLElement | null = null;
    //触发拖拽的目标元素
    protected dragTarget: HTMLElement | null = null;
    //拖拽的起始位置
    protected position: { x: number, y: number } = {x: 0, y: 0};

    public registerDragger(): void {
        this.onDragStart();
        this.onDragEnd();
    }

    protected abstract onDragStart(): void;

    protected abstract onDragMove(e: PointerEvent): void;

    protected abstract onDragEnd(): void;
}

export default AbstractDrag;