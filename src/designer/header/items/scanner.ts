import {AbstractHeaderItem} from "../types/HeaderTypes";

export const headerItems: { [key: string]: any } = {};

export const headerItemScanner = () => {
    const hdItemCtx = require.context('./', true, /\.(tsx|ts)$/);
    hdItemCtx.keys().forEach(key => {
        const compName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
        const comp = hdItemCtx(key).default;
        if (comp && AbstractHeaderItem.isPrototypeOf(comp))
            headerItems[compName] = comp;
    });
}