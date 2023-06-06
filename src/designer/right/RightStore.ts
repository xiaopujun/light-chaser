import {action, makeObservable, observable, runInAction} from "mobx";
import {MenuInfo} from "./MenuType";
import designerStarter from "../DesignerStarter";
import {AbstractCustomComponentDefinition} from "../../framework/abstract/AbstractCustomComponentDefinition";
import {ActiveElem} from "../../framework/types/DesignerType";
import designerStore from "../store/DesignerStore";

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

    activeElem: ActiveElem = {};
    activeElemConfig: any = {};
    menus: Array<MenuInfo> = []
    activeMenu: string = 'background';
    contentVisible: boolean = false;
    updateConfig: Function | undefined = undefined;

    setUpdateConfig = (updateConfig: Function) => {
        this.updateConfig = updateConfig;
    }

    setActiveElem = (activeElem: ActiveElem) => {
        if (!activeElem)
            return;
        this.menus = (designerStarter.autoCompObjs[activeElem.type + ''] as AbstractCustomComponentDefinition).getMenuList();
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
            this.activeElemConfig = designerStore.getActiveElemConfig(this.activeElem.id as number);
        console.log(this.activeElemConfig)
    }

    setActiveElemConfig = (config: any) => {
        this.activeElemConfig = config;
    }

}

const rightStore = new RightStore();
export default rightStore;