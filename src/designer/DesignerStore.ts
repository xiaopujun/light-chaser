import {makeAutoObservable} from "mobx";
import {AbstractHeaderItem} from "./header/types/HeaderTypes";
import {lcCompConfigs, lcCompInits, lcComps} from "./Scanner";
import React from "react";
import {AbstractComp} from "../interf/AbstractComp";
import {AbstractConfig} from "../interf/AbstractConfig";
import {AbstractInit} from "../interf/AbstractInit";

class DesignerStore {
    constructor() {
        makeAutoObservable(this);
    }

    headers: { [key: string]: React.Component | React.FC | any } = {};
    comps: { [key: string]: React.Component | React.FC | any } = {};
    compInits: { [key: string]: React.Component | React.FC | any } = {};
    compConfigs: { [key: string]: React.Component | React.FC | any } = {};
    compTypes: { [key: string]: React.Component | React.FC | any } = {};

    doInit = () => {
        this.scannerHeader();
        this.scannerCompsData();
    }

    scannerHeader = () => {
        const headerCtx = require.context('./header/items', true, /\.(tsx|ts)$/);
        headerCtx.keys().forEach(key => {
            const keyName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            const comp = headerCtx(key).default;
            if (comp && AbstractHeaderItem.isPrototypeOf(comp))
                this.headers[keyName] = comp;
        });
    }

    scannerCompsData = () => {
        const compCtx = require.context('../src/comps', true, /\.(tsx|ts)$/);
        compCtx.keys().forEach(key => {
            const keyName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            const comp = compCtx(key).default;
            if (comp && AbstractComp.isPrototypeOf(comp))
                this.comps[keyName] = comp;
            if (comp && AbstractConfig.isPrototypeOf(comp))
                this.compConfigs[keyName] = comp;
            if (comp && AbstractInit.isPrototypeOf(comp))
                this.compInits[keyName] = comp;
        });
    }
}

const designerStore = new DesignerStore();
export default designerStore;
