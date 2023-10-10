import {action, makeObservable, observable} from "mobx";

class BPLeftStore {
    constructor() {
        makeObservable(this, {
            activeMenu: observable,
            setActiveMenu: action,
            usedLayerNodes: observable,
            setUsedLayerNodes: action,
        })
    }

    activeMenu = 'layer';

    usedLayerNodes: Record<string, boolean> = {};

    setActiveMenu = (menu: string) => {
        this.activeMenu = menu;
    }

    setUsedLayerNodes = (node: string, used: boolean) => {
        this.usedLayerNodes[node] = used;
    }
}

const bpLeftStore = new BPLeftStore();
export default bpLeftStore;