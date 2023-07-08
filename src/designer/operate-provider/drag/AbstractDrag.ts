abstract class AbstractDrag {
    protected target: any = null;
    protected dragTarget: any = null;
    protected position: { x: number, y: number } = {x: 0, y: 0}; // 第一个点坐标

    public registerDragger(): void {
        this.onDragStart(this.target);
        this.onDragEnd(this.target);
    }

    protected abstract onDragStart(e: any): void;

    protected abstract onDragMove(e: any): void;

    protected abstract onDragEnd(e: any): void;
}

export default AbstractDrag;