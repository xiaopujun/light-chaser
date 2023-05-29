import {makeAutoObservable} from "mobx";
import bootCore from "../../BootCore";

class CompListStore {
    constructor() {
        makeAutoObservable(this);
    }

    comps: Array<any> = [];
    compKey: string = '';
    compLoaded: boolean = false;
    visible: boolean = false;

    doInit = () => {
        const comps: Array<any> = [];
        const {autoCompObjs}: any = bootCore;
        if (autoCompObjs) {
            Object.keys(autoCompObjs).forEach(key => {
                let baseInfo = autoCompObjs[key].getBaseInfo();
                if (baseInfo != null)
                    comps.push(baseInfo);
            });
        }
        this.comps = comps;
        this.compLoaded = true;
    }

    setVisible = (visible: boolean) => {
        this.visible = visible;
    }

    setCompKey = (key: string) => {
        this.compKey = key;
    }
}

const compListStore = new CompListStore();
export default compListStore;