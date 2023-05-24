import {makeAutoObservable} from "mobx";

class LcRightMenuStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 右键菜单操作目标id
     */
    targetId = -1;
    /**
     * 右键菜单显示状态
     */
    visible = false;
    /**
     * 右键菜单位置
     */
    position = [0, 0];

    updateVisible = (visible: boolean) => {
        this.visible = visible;
    }

    setPosition = (position: number[]) => {
        this.position = position;
    }

    setTargetId = (targetId: number) => {
        this.targetId = targetId;
    }

}

const lcRightMenu = new LcRightMenuStore();
export default lcRightMenu;