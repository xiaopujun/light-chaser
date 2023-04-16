import {makeAutoObservable} from "mobx";

class RightStore {
    constructor() {
        makeAutoObservable(this);
    }
}

const rightStore = new RightStore();
export default rightStore;