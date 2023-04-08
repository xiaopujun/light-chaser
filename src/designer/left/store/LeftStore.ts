import {makeAutoObservable} from "mobx";

class LeftStore {
    constructor() {
        makeAutoObservable(this);
    }

    //分类列表搜索key
    sortKey: string = '';
    //分类列表
    sorts: Array<any> = [];
    //分类列表class
    sortsClazz: any = {};
    //组件列表
    comps: Array<any> = [];
    //组件列表class
    compsClazz: any = {};
    //组件搜索key
    compKey: string = '';

    //是否展示组件列表
    showComps: boolean = false;

    setSortKey = (key: string) => this.sortKey = key;

    setSorts = (sorts: Array<any>) => this.sorts = sorts;

    setSortsClazz = (sortsClazz: any) => {
        this.sortsClazz = sortsClazz;
        let sorts: Array<any> = [];
        let compNames = Object.keys(sortsClazz);
        if (sortsClazz && compNames.length > 0) {
            for (let i = 0; i < compNames.length; i++) {
                const sortInfo = new sortsClazz[compNames[i]]().getSortItemInfo();
                sorts.push(sortInfo);
            }
            this.sorts = sorts;
        }
    };

    setComps = (comps: Array<any>) => this.comps = comps;

    setCompsClazz = (compsClazz: any) => this.compsClazz = compsClazz;

    setShowComps = (showComps: boolean) => this.showComps = showComps;

    setCompKey = (key: string) => this.compKey = key;

}

const leftStore = new LeftStore();
export default leftStore;