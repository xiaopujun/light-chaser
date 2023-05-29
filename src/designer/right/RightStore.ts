import {action, makeObservable, observable} from "mobx";
import {MenuInfo} from "../../framework/types/MenuType";
import bootCore from "../BootCore";
import {AbstractAutoScannerCore} from "../../framework/abstract/AbstractAutoScannerCore";
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
        this.menus = (bootCore.autoCompObjs[activeElem.type + ''] as AbstractAutoScannerCore).getMenuList();
        this.activeElem = activeElem;
        if (this.contentVisible) {
            this.contentVisible = false;
            setTimeout(() => {
                this.contentVisible = true;
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