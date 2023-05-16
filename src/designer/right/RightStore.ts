import {action, makeObservable, observable} from "mobx";
import React from "react";
import {MenuInfo} from "../../framework/types/MenuType";

class RightStore {
    constructor() {
        makeObservable(this, {
            configObjs: observable,
            activeMenu: observable,
            loaded: observable,
            contentVisible: observable,
            setActiveMenu: action,
            setMenus: action
        })
    }

    menus: Array<MenuInfo> = []
    configObjs: { [key: string]: Object } = {};
    activeMenu: string = 'background';
    loaded: boolean = false;
    contentVisible: boolean = false;

    setActiveMenu = (menu: string) => {
        this.activeMenu = menu;
    }

    setMenus = (menus: Array<MenuInfo>) => {
        this.menus = menus;
    }

    setContentVisible = (visible: boolean) => {
        this.contentVisible = visible;
    }

    doInit = (configClazz: { [key: string]: React.Component | React.FC | any } = {}) => {
        let configObjs: { [key: string]: Object } = {};
        Object.keys(configClazz).forEach((key: string) => {
            configObjs[key] = new configClazz[key]();
        });
        this.configObjs = configObjs;
    }

}

const rightStore = new RightStore();
export default rightStore;