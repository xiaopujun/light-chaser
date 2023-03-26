import {makeAutoObservable} from "mobx";

class LeftStore {
    constructor() {
        makeAutoObservable(this);
    }

    //分类列表搜索key
    sortKey: string = '';
    //分类列表
    sorts: Array<any> = [];
    //组件列表
    comps: Array<any> = [];
    //是否展示组件列表
    showComps: boolean = false;

    setSortKey = (key: string) => this.sortKey = key;

    setSorts = (sorts: Array<any>) => this.sorts = sorts;

    setComps = (comps: Array<any>) => this.comps = comps;

    setShowComps = (showComps: boolean) => this.showComps = showComps;

}

const leftStore = new LeftStore();
export default leftStore;