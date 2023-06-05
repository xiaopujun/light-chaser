import React from "react";
import headerStore from "./header/HeaderStore";
import {AbstractComponentDefinitionCore} from "../framework/abstract/AbstractComponentDefinitionCore";
import {AbstractHeaderItem} from "./header/HeaderTypes";

/**
 * 设计器启动器，通过该启动器自动化扫描加载组件
 */
class DesignerStarter {
    //自定义组件
    autoCompObjs: { [key: string]: Object } = {};
    //头部操作菜单组件
    headersClazz: { [key: string]: React.Component | React.FC | any } = {};
    //主题刷新器
    themeRefresher: { [key: string]: Function } = {};
    //是否已经加载完毕
    loaded: boolean = false;


    //todo 扫描组件，要优化为异步扫描
    doInit = () => {
        this.scannerHeader();
        this.scannerCompsData();
        this.loaded = true;
    }

    //扫描头部组件
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

    //扫描自定义组件
    scannerCompsData = () => {
        const compCtx = require.context('../comps', true, /\.(tsx|ts)$/);
        compCtx.keys().forEach(key => {
            const Clazz = compCtx(key).default;
            if (Clazz && AbstractComponentDefinitionCore.isPrototypeOf(Clazz)) {
                let autoCompObj = new Clazz();
                this.autoCompObjs[autoCompObj.getKey()] = autoCompObj;
                this.themeRefresher[autoCompObj.getKey()] = autoCompObj.updateTheme;
            }
        });
    }
}

const designerStarter = new DesignerStarter();
export default designerStarter;
