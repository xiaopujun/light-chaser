import {action, makeObservable, observable} from "mobx";

/**
 * 右键操作菜单的状态管理类。
 */
class ContextMenuStore {
    constructor() {
        makeObservable(this, {
            visible: observable,
            position: observable,
            updateVisible: action,
            setPosition: action,
        })
    }

    /**
     * 右键菜单显示状态
     */
    visible = false;
    /**
     * 右键菜单位置
     */
    position = [0, 0];
    /**
     * 鼠标按下时间，用于优化。 右键菜单的操作体验。由于长按右键是拖拽整个画布的操作。 在长时间按住右键后。
     * 右键菜单也会显示。为了避免这种情况。 需要在鼠标抬起时。 判断鼠标按下到抬起的时间。如果时间小于200ms则不显示右键菜单。
     */
    mouseDownTime = 0;
    /**
     * 鼠标抬起时间
     */
    mouseUpTime = 0;

    updateVisible = (visible: boolean) => this.visible = visible;

    setPosition = (position: number[]) => this.position = position;

    setMouseDownTime = (time: any) => this.mouseDownTime = time;

    setMouseUpTime = (time: any) => this.mouseUpTime = time;

}

const contextMenuStore = new ContextMenuStore();
export default contextMenuStore;