import {HeaderItem} from "./header/types/HeaderItem";
import React from "react";

/*********************************************************************
 * 设计器组件扫描器，用于自动扫描实现了部件接口的组件，并装载到内容中，供设计器使用
 *********************************************************************/

//todo 后续要改造为路径动态传入，通过LoadJs异步加载指定目录下编译好的react组件

export const headerItems: { [key: string]: any } = {};
export const lcComps: { [key: string]: React.FunctionComponent } = {};
export const lcCompInits: { [key: string]: () => any } = {};
export const lcCompConfigs: { [key: string]: React.FunctionComponent } = {};

export const doScanInit = () => {
    compScanner();
    headerItemScanner();
}


export const headerItemScanner = () => {
    const hdItemCtx = require.context('./header', true, /\.(tsx|ts)$/);
    hdItemCtx.keys().forEach(key => {
        const compName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
        const comp = hdItemCtx(key).default;
        if (comp && HeaderItem.isPrototypeOf(comp))
            headerItems[compName] = comp;
    });
}


export const compScanner = () => {
    const context = require.context('../component/charts', true, /\.(tsx|ts)$/);
    context.keys().forEach(key => {
        const componentName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
        if (componentName.match("Set$"))
            lcCompConfigs[componentName] = context(key).default;
        else if (componentName.match("Init$")) {
            const CompInit = context(key).default;
            if (CompInit !== undefined) {
                lcCompInits[componentName] = new CompInit();
            }
        } else
            lcComps[componentName] = context(key).default;
    });
}
