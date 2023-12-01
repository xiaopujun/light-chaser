import {action, makeObservable, observable} from "mobx";
import {BaseInfoType} from "../../DesignerType";
import DesignerLoaderFactory from "../../loader/DesignerLoaderFactory";

/**
 * 设计器左侧列表组件的状态管理类。
 */
class CompListStore {
    constructor() {
        makeObservable(this, {
            compKey: observable,
            visible: observable,
            setVisible: action,
            setCompKey: action,
        });
    }

    /**
     * 组件基础信息数组。设计器左侧组件列表的展示过滤依赖于此数组。
     * 该数组会在设计器加载时进行初始化，后续不再修改。若其他。 场景或组件需要。 操作该数组的数据。 应该操作他的备份。 而不是直接操作该数组。
     */
    compInfoArr: Array<BaseInfoType> = [];
    /**
     * 组件搜索关键字，左侧组件列表根据关键字过滤与组件，使会用到该属性。
     */
    compKey: string = '';
    /**
     * 组件列表可见性。
     */
    visible: boolean = false;

    doInit = () => {
        const comps: Array<any> = [];
        const {definitionMap} = DesignerLoaderFactory.getLoader();
        if (definitionMap) {
            Object.keys(definitionMap).forEach(key => {
                let baseInfo = definitionMap[key].getBaseInfo();
                if (baseInfo.compKey !== 'group') comps.push(baseInfo);
            });
        }
        this.compInfoArr = comps;
    }

    setVisible = (visible: boolean) => this.visible = visible;

    setCompKey = (key: string) => this.compKey = key;
}

const compListStore = new CompListStore();
export default compListStore;