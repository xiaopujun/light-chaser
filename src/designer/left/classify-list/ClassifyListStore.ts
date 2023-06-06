import {makeAutoObservable} from "mobx";
import {AlignLeftOutlined, AppstoreFilled} from "@ant-design/icons";
import {ClassifyEnum} from "../../../framework/types/ClassifyType";

const getClassifyItemInfo = () => {
    return [
        {
            icon: AppstoreFilled,
            name: "全部",
            classify: ClassifyEnum.ALL,
        },
        {
            icon: AlignLeftOutlined,
            name: "条形图",
            classify: ClassifyEnum.BAR,
        }
    ]
}

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
     * 分类搜索关键字
     */
    classifyKey: string = 'all';

    /**
     * 初始化
     */
    doInit = () => {
        this.classifies = getClassifyItemInfo();
    }

    /**
     * 清空store
     */
    doClear = () => {
        this.classifies = [];
    }

    setClassifyKey = (key: string) => {
        this.classifyKey = key;
    }
}

const classifyListStore = new ClassifyListStore();
export default classifyListStore;