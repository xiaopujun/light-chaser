import {AbstractHeaderItem} from "../framework/types/HeaderTypes";
import React from "react";
import {AbstractClassifyItem} from "../framework/abstract/AbstractClassifyItem";
import headerStore from "./header/HeaderStore";
import {AbstractAutoScannerCore} from "../framework/abstract/AbstractAutoScannerCore";

/**
 * 设计器启动器，通过该启动器自动化扫描加载组件
 */
class BootCore {

    autoCompObjs: { [key: string]: Object } = {};
    headersClazz: { [key: string]: React.Component | React.FC | any } = {};
    compTypeClazz: { [key: string]: React.Component | React.FC | any } = {};
    classifyClazz: { [key: string]: React.Component | React.FC | any } = {};
    themeRefresher: { [key: string]: Function } = {};

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
            const Clazz = compCtx(key).default;
            if (Clazz && AbstractAutoScannerCore.isPrototypeOf(Clazz)) {
                let autoCompObj = new Clazz();
                this.autoCompObjs[autoCompObj.getKey()] = autoCompObj;
                this.themeRefresher[autoCompObj.getKey()] = autoCompObj.updateTheme;
            }
        });
        console.log(this.themeRefresher)
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

const bootCore = new BootCore();
export default bootCore;
