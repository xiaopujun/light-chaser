import {action, makeObservable, observable} from "mobx";
import {AppstoreAddOutlined, BlockOutlined, UngroupOutlined} from "@ant-design/icons";
import {ComponentType} from "react";

export interface ILeftMenu {
    icon: ComponentType,
    name: string,
    key: string,
}

class DesignerLeftStore {
    constructor() {
        makeObservable(this, {
            menu: observable,
            setMenu: action,
        });
    }

    /**
     * 分类列表
     */
    menus: Array<ILeftMenu> = [
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

    menu: string = '';

    setMenu = (menu: string) => this.menu = menu;

    designerLeftRef: HTMLElement | null = null;

    setDesignerLeftRef = (ref: HTMLElement | null) => this.designerLeftRef = ref;

}

const designerLeftStore = new DesignerLeftStore();
export default designerLeftStore;