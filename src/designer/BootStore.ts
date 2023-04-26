import {AbstractHeaderItem} from "../types/HeaderTypes";
import React from "react";
import {AbstractComp} from "../interf/AbstractComp";
import {AbstractConfig} from "../interf/AbstractConfig";
import {AbstractInit} from "../interf/AbstractInit";
import {AbstractClassifyItem} from "../interf/AbstractClassifyItem";
import headerStore from "./header/HeaderStore";
import rightStore from "./right/RightStore";

class BootStore {

    headersClazz: { [key: string]: React.Component | React.FC | any } = {};
    compsClazz: { [key: string]: React.Component | React.FC | any } = {};
    compInitClazz: { [key: string]: React.Component | React.FC | any } = {};
    compConfigClazz: { [key: string]: React.Component | React.FC | any } = {};
    compTypeClazz: { [key: string]: React.Component | React.FC | any } = {};
    classifyClazz: { [key: string]: React.Component | React.FC | any } = {};

    compInitObj: { [key: string]: Object } = {};

    loaded: boolean = false;


    //todo 扫描组件，要优化为异步扫描
    doInit = () => {
        this.scannerHeader();
        this.scannerCompsData();
        this.scannerClassify();
        this.loaded = true;
    }

    scannerHeader = () => {
        const headerCtx = require.context('./header/items', true, /\.(tsx|ts)$/);
        let headersClazz: { [key: string]: React.Component | React.FC | any } = {};
        headerCtx.keys().forEach(key => {
            const keyName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            const comp = headerCtx(key).default;
            if (comp && AbstractHeaderItem.isPrototypeOf(comp))
                headersClazz[keyName] = comp;
        });
        this.headersClazz = headersClazz;
        const {doInit} = headerStore;
        doInit(headersClazz);
    }

    scannerCompsData = () => {
        const compCtx = require.context('../comps', true, /\.(tsx|ts)$/);
        compCtx.keys().forEach(key => {
            const keyName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            const comp = compCtx(key).default;
            if (comp && AbstractComp.isPrototypeOf(comp))
                this.compsClazz[keyName] = comp;
            if (comp && AbstractConfig.isPrototypeOf(comp)) {
                this.compConfigClazz[keyName] = comp;
            }
            if (comp && AbstractInit.isPrototypeOf(comp)) {
                this.compInitClazz[keyName] = comp;
                this.compInitObj[keyName] = new comp();
            }
        });
        const {doInit} = rightStore;
        doInit && doInit(this.compConfigClazz);
    }

    scannerClassify = () => {
        const classifyCtx = require.context('./left/classify-list/items', true, /\.(tsx|ts)$/);
        classifyCtx.keys().forEach(key => {
            const keyName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
            const comp = classifyCtx(key).default;
            if (comp && AbstractClassifyItem.isPrototypeOf(comp)) {
                this.classifyClazz[keyName] = comp;
            }
        })
    }
}

const bootStore = new BootStore();
export default bootStore;
