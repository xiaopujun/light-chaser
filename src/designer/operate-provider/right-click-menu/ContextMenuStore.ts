import {action, makeObservable, observable} from "mobx";

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

    mouseDownTime = 0;

    mouseUpTime = 0;

    updateVisible = (visible: boolean) => {
        this.visible = visible;
    }

    setPosition = (position: number[]) => {
        this.position = position;
    }

    setMouseDownTime = (time: any) => this.mouseDownTime = time;

    setMouseUpTime = (time: any) => {
        this.mouseUpTime = time;
    };

}

const contextMenuStore = new ContextMenuStore();
export default contextMenuStore;