import {makeAutoObservable} from "mobx";
import designerStarter from "../../DesignerStarter";

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
        const {customComponentInfoMap}: any = designerStarter;
        if (customComponentInfoMap) {
            Object.keys(customComponentInfoMap).forEach(key => {
                let baseInfo = customComponentInfoMap[key].getBaseInfo();
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