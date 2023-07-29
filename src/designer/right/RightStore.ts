import {action, makeObservable, observable, runInAction} from "mobx";
import {MenuInfo} from "./MenuType";
import designerStarter from "../DesignerStarter";
import {AbstractCustomComponentDefinition} from "../../framework/core/AbstractCustomComponentDefinition";
import {ActiveElem} from "../DesignerType";
import designerStore from "../store/DesignerStore";
import {PictureFilled} from "@ant-design/icons";


export const bgMenu: MenuInfo[] = [{
    icon: PictureFilled,
    name: '背景',
    key: 'background',
}];

/**
 * 设计器。右侧组件配置状态管理类
 */
class RightStore {
    constructor() {
        makeObservable(this, {
            menus: observable,
            activeMenu: observable,
            visible: observable,
            setActiveMenu: action,
            setContentVisible: action,
            activeConfig: action,
        })
    }

    /**
     * 当前选中的组件
     */
    activeElem: ActiveElem = {id: '80cc666f', type: 'LcBg'};
    /**
     * 当前选中组件的配置
     */
    // activeElemConfig: any = {};
    /**
     * 当前选中组件的操作菜单列表
     */
    menus: Array<MenuInfo> = bgMenu;
    /**
     * 当前选中组件的操作菜单列表中处于激活状态的菜单
     */
    activeMenu: string = 'background';
    /**
     * 右侧组件配置区域是否可见
     */
    visible: boolean = false;
    /**
     * 更新组件配置的方法
     */
        // updateConfig: Function | undefined = undefined;

        // setUpdateConfig = (updateConfig: Function) => this.updateConfig = updateConfig;

    setActiveElem = (activeElem: ActiveElem) => {
        if (!activeElem) return;
        this.menus = (designerStarter.customComponentInfoMap[activeElem.type + ''] as AbstractCustomComponentDefinition).getMenuList() || [];
        this.activeElem = activeElem;
        if (this.visible) {
            this.visible = false;
            setTimeout(() => {
                runInAction(() => this.visible = true);
            }, 0);
        }
    }

    setActiveMenu = (menu: string, newMenus?: string[]) => {
        if (newMenus && newMenus.includes(this.activeMenu))
            return;
        this.activeMenu = menu;
    }

    setContentVisible = (visible: boolean) => {
        this.visible = visible;
        // if (visible)
        //     this.activeElemConfig = designerStore.getActiveElemConfig(this.activeElem.id + '');
    }

    // setActiveElemConfig = (config: any) => this.activeElemConfig = config;


    activeConfig = (id: string, type: string) => {
        if (type === 'LcBg') {
            //激活背景设置
            //更新菜单列表
            this.menus = bgMenu;
            this.activeMenu = 'background';
            this.activeElem = {id: '-1', type: 'LcBg'};
            //如果配置面板处于开启状态，则同时更新菜单和配置面板
            if (this.visible) {
                const {backgroundConfig} = designerStore;
                // this.activeElemConfig = backgroundConfig;
            }
        } else {
            //更新菜单列表
            this.menus = (designerStarter.customComponentInfoMap[type] as AbstractCustomComponentDefinition).getMenuList() || [];
            this.activeMenu = this.menus[0].key;
            this.activeElem = {id, type};
            //如果配置面板处于开启状态，则同时更新菜单和配置面板
            if (this.visible) {
                const {backgroundConfig} = designerStore;
                // this.activeElemConfig = backgroundConfig;
            }
            //激活组件设置
            const {compInstances} = designerStore;
            const instance = compInstances[id];
            // this.activeElemConfig = instance.getConfig();
        }
    }
}

const rightStore = new RightStore();
export default rightStore;