import {makeAutoObservable} from "mobx";

class LcBgConfigStore {
    constructor() {
        makeAutoObservable(this);
    }

    bgImgSource = null;

    setBgImgSource = (data: any) => this.bgImgSource = data;

}

let lcBgConfigStore = new LcBgConfigStore();
export default lcBgConfigStore;