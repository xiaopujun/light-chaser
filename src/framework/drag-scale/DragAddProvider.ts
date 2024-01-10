export default class DragAddProvider {
    private readonly dragSource: HTMLElement | null = null;
    private readonly dragTarget: HTMLElement | null = null;
    private readonly dragStart: (e: DragEvent) => void;
    private readonly dragOver: (e: DragEvent) => void;
    private readonly drop: (e: DragEvent) => void;

    constructor(dragSource: HTMLElement,
                dragTarget: HTMLElement,
                dragStart: (e: DragEvent) => void,
                dragOver: (e: DragEvent) => void,
                drop: (e: DragEvent) => void) {
        if (!dragSource || !dragTarget)
            throw new Error("dragSource or dragTarget is null");
        this.dragSource = dragSource;
        this.dragTarget = dragTarget;
        this.dragStart = dragStart;
        this.dragOver = dragOver;
        this.drop = drop;

        // bind event
        this.dragStart && this.dragSource && this.dragSource.addEventListener('dragstart', this.dragStart);
        this.dragOver && this.dragTarget && this.dragTarget.addEventListener('dragover', this.dragOver);
        this.drop && this.dragTarget && this.dragTarget.addEventListener('drop', this.drop);
    }

    public destroy() {
        // unbind event
        this.dragStart && this.dragSource && this.dragSource.removeEventListener('dragstart', this.dragStart);
        this.dragOver && this.dragTarget && this.dragTarget.removeEventListener('dragover', this.dragOver);
        this.drop && this.dragTarget && this.dragTarget.removeEventListener('drop', this.drop);
    }

}