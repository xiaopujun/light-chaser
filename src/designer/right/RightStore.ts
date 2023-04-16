import {makeAutoObservable} from "mobx";
import {MenuInfo} from "../../types/MenuType";
import {AbstractMenu} from "../../interf/AbstractMenu";
import React from "react";

class RightStore {
    constructor() {
        makeAutoObservable(this);
    }


    menus: Array<MenuInfo> = []
    activated: string = 'bg';
    loaded: boolean = false;

    doInit = (configClazz: { [key: string]: React.Component | React.FC | any } = {}) => {
        //todo 需要优化调用结构
        const menuItemCtx = require.context('./items/', true, /\.(tsx|ts)$/);
        const menuClazz: { [key: string]: any } = {};
        const menus: Array<any> = [];
        //todo 需要改成异步扫描
        menuItemCtx.keys().forEach(key => {
            const clazzName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            const Clazz = menuItemCtx(key).default;
            if (Clazz && AbstractMenu.isPrototypeOf(Clazz)) {
                menuClazz[clazzName] = Clazz;
                menus.push(new Clazz().getMenuInfo());
            }
        })
        this.menus = menus;
    }


}

const rightStore = new RightStore();
export default rightStore;