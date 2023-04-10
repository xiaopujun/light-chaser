import {makeAutoObservable} from "mobx";
import {AbstractInit} from "../../../component/charts/interface/AbstractInit";
import {AbstractChart} from "../../../component/charts/interface/AbstractChart";
import {AbstractConfig} from "../../../component/charts/interface/AbstractConfig";

class CompListStore {
    constructor() {
        makeAutoObservable(this);
    }

    comps: Array<any> = [];
    compKey: string = '';
    compLoaded: boolean = false;
    visible: boolean = true;

    doInit = () => {
        const compCtx = require.context('../../../component/charts', true, /\.(tsx|ts)$/);
        const compClazz: { [key: string]: any } = {},
            initClazz: { [key: string]: any } = {},
            configClazz: { [key: string]: any } = {};
        const comps: Array<any> = [];
        compCtx.keys().forEach(key => {
                const clazzName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
                const Clazz = compCtx(key).default;
                if (Clazz) {
                    if (AbstractInit.isPrototypeOf(Clazz)) {
                        initClazz[clazzName] = Clazz;
                        comps.push(new Clazz().getBaseInfo());
                    }
                    if (AbstractChart.isPrototypeOf(Clazz))
                        compClazz[clazzName] = Clazz;
                    if (AbstractConfig.isPrototypeOf(Clazz))
                        configClazz[clazzName] = Clazz;
                }
            }
        )
        window.initClazz = initClazz;
        window.compClazz = compClazz;
        window.configClazz = configClazz;
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