import {makeAutoObservable} from "mobx";

class MovableStore {

    constructor() {
        makeAutoObservable(this);
    }

    activeMovableItemId: string = '';

    setActiveMovableItemId = (id: string) => {
        this.activeMovableItemId = id;
    }
}


const movableStore = new MovableStore();
export default movableStore;