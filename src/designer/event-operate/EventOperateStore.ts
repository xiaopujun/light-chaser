import {makeAutoObservable} from "mobx";

class EventOperateStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 缩放系数
     */
    scale: number = 1;

    setScale = (scale: number) => this.scale = scale;

}

const eventOperateStore = new EventOperateStore();
export default eventOperateStore;