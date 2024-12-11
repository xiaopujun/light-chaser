import {action, makeObservable, observable} from "mobx";

class BPLeftStore {
    constructor() {
        makeObservable(this, {
            activeMenu: observable,
            setActiveMenu: action,
            usedLayerNodes: observable,
            setUsedLayerNodes: action,
            searchValue: observable,
            setSearchValue: action,
        })
    }

    activeMenu = 'layer';

    usedLayerNodes: Record<string, boolean> = {};

    searchValue = '';

    setSearchValue = (value: string) => this.searchValue = value;

    setActiveMenu = (menu: string) => this.activeMenu = menu;

    setUsedLayerNodes = (node: string, used: boolean) => this.usedLayerNodes[node] = used;

    initUsedLayerNodes = (usedNodes: Record<string, boolean>) => this.usedLayerNodes = usedNodes;
}

const bpLeftStore = new BPLeftStore();
export default bpLeftStore;