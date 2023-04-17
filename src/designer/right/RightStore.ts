import {makeAutoObservable} from "mobx";
import React from "react";
import {MenuInfo} from "../../types/MenuType";

class RightStore {
    constructor() {
        makeAutoObservable(this);
    }

    menus: Array<MenuInfo> = []
    configObjs: { [key: string]: Object } = {};
    activated: string = 'backgrounds';
    loaded: boolean = false;

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