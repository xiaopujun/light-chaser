import {makeAutoObservable} from "mobx";

class LcRightMenuStore {
    constructor() {
        makeAutoObservable(this);
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
     * 右键菜单内容
     */
    menuList: any[] = [];

    updateVisible = (visible: boolean) => {
        this.visible = visible;
    }

    setPosition = (position: number[]) => {
        this.position = position;
    }

    setMenuList = (menuList: any[]) => {
        this.menuList = menuList;
    }

}

const lcRightMenu = new LcRightMenuStore();
export default lcRightMenu;