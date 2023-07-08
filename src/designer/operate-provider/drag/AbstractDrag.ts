abstract class AbstractDrag {
    //被拖拽的目标
    protected target: any = null;
    //触发拖拽的目标元素
    protected dragTarget: any = null;
    //拖拽的起始位置
    protected position: { x: number, y: number } = {x: 0, y: 0};

    public registerDragger(): void {
        this.onDragStart(this.target);
        this.onDragEnd(this.target);
    }

    protected abstract onDragStart(e: any): void;

    protected abstract onDragMove(e: any): void;

    protected abstract onDragEnd(e: any): void;
}

export default AbstractDrag;