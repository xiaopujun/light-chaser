import {action, makeObservable, observable, runInAction} from "mobx";
import {MenuInfo} from "./MenuType";
import designerStarter from "../DesignerStarter";
import {AbstractCustomComponentDefinition} from "../../framework/core/AbstractCustomComponentDefinition";
import {ActiveElem} from "../DesignerType";
import designerStore from "../store/DesignerStore";

/**
 * 设计器。右侧组件配置状态管理类
 */
class RightStore {
    constructor() {
        makeObservable(this, {
            menus: observable,
            activeMenu: observable,
            contentVisible: observable,
            setActiveMenu: action,
            setContentVisible: action,
        })
    }

    /**
     * 当前选中的组件
     */
    activeElem: ActiveElem = {id: -1, type: 'LcBg'};
    /**
     * 当前选中组件的配置
     */
    activeElemConfig: any = {};
    /**
     * 当前选中组件的操作菜单列表
     */
    menus: Array<MenuInfo> = []
    /**
     * 当前选中组件的操作菜单列表中处于激活状态的菜单
     */
    activeMenu: string = 'background';
    /**
     * 右侧组件配置区域是否可见
     */
    contentVisible: boolean = false;
    /**
     * 更新组件配置的方法
     */
    updateConfig: Function | undefined = undefined;

    setUpdateConfig = (updateConfig: Function) => this.updateConfig = updateConfig;

    setActiveElem = (activeElem: ActiveElem) => {
        if (!activeElem) return;
        this.menus = (designerStarter.customComponentInfoMap[activeElem.type + ''] as AbstractCustomComponentDefinition).getMenuList();
        this.activeElem = activeElem;
        if (this.contentVisible) {
            this.contentVisible = false;
            setTimeout(() => {
                runInAction(() => this.contentVisible = true);
            }, 0);
        }
    }

    setActiveMenu = (menu: string, newMenus?: string[]) => {
        if (newMenus && newMenus.includes(this.activeMenu))
            return;
        this.activeMenu = menu;
    }

    setContentVisible = (visible: boolean) => {
        this.contentVisible = visible;
        if (visible)
            this.activeElemConfig = designerStore.getActiveElemConfig(this.activeElem.id + '');
    }

    setActiveElemConfig = (config: any) => this.activeElemConfig = config;

}

const rightStore = new RightStore();
export default rightStore;