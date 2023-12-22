import {makeAutoObservable} from "mobx";
import {AppstoreAddOutlined, BlockOutlined, UngroupOutlined} from "@ant-design/icons";
import {ComponentType} from "react";

export interface ILeftMenu {
    icon: ComponentType,
    name: string,
    key: string,
}

/**
 * 左侧分类列表store
 */
class LeftMenusStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 分类列表
     */
    classifies: Array<ILeftMenu> = [
        {
            icon: BlockOutlined,
            name: "图层",
            key: 'layer-list',
        },
        {
            icon: AppstoreAddOutlined,
            name: "组件库",
            key: 'components',
        },
        {
            icon: UngroupOutlined,
            name: "资源库",
            key: 'source-list',
        },
    ];

    /**
     * 分类搜索关键字
     */
    classifyKey: string = 'all';


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

const classifyListStore = new LeftMenusStore();
export default classifyListStore;