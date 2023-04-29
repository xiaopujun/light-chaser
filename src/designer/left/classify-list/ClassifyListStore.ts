import {makeAutoObservable} from "mobx";
import {AbstractClassifyItem} from "../../../types/lc-interface/AbstractClassifyItem";

/**
 * 左侧分类列表store
 */
class ClassifyListStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 分类列表
     */
    classifies: Array<any> = [];
    /**
     * 组件是否扫描完毕
     */
    clazzLoaded: boolean = false;
    /**
     * 分类搜索关键字
     */
    classifyKey: string = 'all';

    /**
     * 初始化
     */
    doInit = () => {
        //todo 需要优化调用结构
        const classifyItemCtx = require.context('./items/', true, /\.(tsx|ts)$/);
        const classifyClazz: { [key: string]: any } = {};
        const classifies: Array<any> = [];
        //todo 需要改成异步扫描
        classifyItemCtx.keys().forEach(key => {
            const clazzName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            const Clazz = classifyItemCtx(key).default;
            if (Clazz && AbstractClassifyItem.isPrototypeOf(Clazz)) {
                classifyClazz[clazzName] = Clazz;
                classifies.push(new Clazz().getClassifyItemInfo());
            }
        })
        window.classifyClazz = classifyClazz;
        this.classifies = classifies;
        this.clazzLoaded = true;
    }

    /**
     * 清空store
     */
    doClear = () => {
        this.classifies = [];
        this.clazzLoaded = false;
    }

    setClassifyKey = (key: string) => {
        this.classifyKey = key;
    }
}

const classifyListStore = new ClassifyListStore();
export default classifyListStore;