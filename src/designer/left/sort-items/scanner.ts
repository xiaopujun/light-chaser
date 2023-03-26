import {AbstractSortItem} from "../types/SortItemTypes";
import leftStore from "../store/LeftStore";

export const sortItemScanner = () => {
    const sortItemCtx = require.context('./', true, /\.(tsx|ts)$/);
    const {setSortsClazz} = leftStore;
    const sortItems: { [key: string]: any } = {};
    sortItemCtx.keys().forEach(key => {
        const compName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
        const comp = sortItemCtx(key).default;
        if (comp && AbstractSortItem.isPrototypeOf(comp))
            sortItems[compName] = comp;
    });
    setSortsClazz(sortItems);
}