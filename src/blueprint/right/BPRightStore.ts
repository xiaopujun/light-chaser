import {action, makeObservable, observable} from "mobx";

class BPRightStore {
    constructor() {
        makeObservable(this, {
            activeNode: observable,
            setActiveNode: action,
        })
    }

    activeNode: string | null = null;

    setActiveNode = (node: string | null) => {
        this.activeNode = node;
    }
}

const bpRightStore = new BPRightStore();
export default bpRightStore;