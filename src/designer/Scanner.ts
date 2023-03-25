import {lcCompConfigs, lcCompInits, lcComps} from "./index";
import {HeaderItem} from "./header/HeaderItem";

/*********************************************************************
 * 设计器组件扫描器，用于自动扫描实现了部件接口的组件，并装载到内容中，供设计器使用
 *********************************************************************/

export const headerItemScanner = () => {
    const hdItemCtx = require.context('./header', true, /\.(tsx|ts)$/);
    hdItemCtx.keys().forEach(key => {
        const compName = key.replace(/^\.\/([\w|-]+\/)*(\w+)\.(tsx|ts)$/, '$2');
        const comp = hdItemCtx(key).default;
        if (comp) {
            console.log(HeaderItem.isPrototypeOf(comp));
        }
    });
}

