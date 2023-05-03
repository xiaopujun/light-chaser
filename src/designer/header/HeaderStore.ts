import {makeAutoObservable} from "mobx";
import React from "react";
import {HeaderItemProps} from "../../framework/types/HeaderTypes";

class HeaderStore {
    constructor() {
        makeAutoObservable(this);
    }

    headerInfoArr: Array<HeaderItemProps> = [];
    loaded: boolean = false;

    doInit = (headersClazz: { [key: string]: React.Component | React.FC | any } = {}) => {
        let headerInfoArr: Array<HeaderItemProps> = [];
        let clazzNames = Object.keys(headersClazz);
        if (clazzNames && clazzNames.length > 0) {
            for (let i = 0; i < clazzNames.length; i++) {
                const headerInfo = new headersClazz[clazzNames[i]]().getHeaderItemInfo();
                headerInfoArr.push(headerInfo);
            }
        }
        this.headerInfoArr = headerInfoArr;
        this.loaded = true;
    }

}

const headerStore = new HeaderStore();
export default headerStore;
