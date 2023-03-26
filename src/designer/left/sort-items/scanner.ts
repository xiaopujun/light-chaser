import {AbstractSortItem} from "../types/SortItemTypes";

export const sortItems: { [key: string]: any } = {};

export const sortItemScanner = () => {
    const sortItemCtx = require.context('./', true, /\.(tsx|ts)$/);
    sortItemCtx.keys().forEach(key => {
        const compName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
        const comp = sortItemCtx(key).default;
        if (comp && AbstractSortItem.isPrototypeOf(comp))
            sortItems[compName] = comp;
    });
}