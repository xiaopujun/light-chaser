import {makeAutoObservable} from "mobx";

class LeftStore {
    constructor() {
        makeAutoObservable(this);
    }

    sortKey: string = '';
    sorts: Array<any> = [];
    comps: Array<any> = [];
    showComps: boolean = false;

}

const leftStore = new LeftStore();
export default leftStore;