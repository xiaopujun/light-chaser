import {AbstractCustomComponentDefinition} from "../framework/core/AbstractCustomComponentDefinition";
import {AbstractHeaderItem, HeaderItemProps} from "./header/HeaderTypes";
import {AbstractOperator} from "../framework/operate/AbstractOperator";

/**
 * 设计器启动器，通过该启动器自动化扫描加载组件
 */
class DesignerStarter {
    //自定义组件信息映射
    customComponentInfoMap: Record<string, AbstractCustomComponentDefinition> = {};
    //头部操作菜单实例
    headerItemInstances: HeaderItemProps[] = [];
    //项目数据操作映射
    abstractOperatorMap: { [key: string]: AbstractOperator } = {};


    //todo 扫描组件，要优化为异步扫描
    doScan = () => {
        this.scannerHeader();
        this.scannerCustomComponents();
        this.scannerProjectOperators();
    }

    //扫描头部组件
    scannerHeader = () => {
        const headerCtx = require.context('./header/items', true, /\.(tsx|ts)$/);
        let tempHeaderItemInstances: HeaderItemProps[] = [];
        headerCtx.keys().forEach(key => {
            const HeaderClazz = headerCtx(key).default;
            if (HeaderClazz && AbstractHeaderItem.isPrototypeOf(HeaderClazz)) {
                let headerItemIns = new HeaderClazz();
                tempHeaderItemInstances.push(headerItemIns.getHeaderItemInfo());
            }
        });
        this.headerItemInstances = tempHeaderItemInstances.sort((a, b) => {
            const aOrder = a.order || 0, bOrder = b.order || 0;
            return aOrder - bOrder
        });
    }

    //扫描自定义组件
    scannerCustomComponents = () => {
        const compCtx = require.context('../comps', true, /\.(ts)$/);
        compCtx.keys().forEach(key => {
            const Clazz = compCtx(key).default;
            if (Clazz && AbstractCustomComponentDefinition.isPrototypeOf(Clazz)) {
                let customComponentInfo: AbstractCustomComponentDefinition = new Clazz();
                if (typeof customComponentInfo.getBaseInfo === "function") {
                    let compKey = customComponentInfo.getBaseInfo().compKey;
                    if (compKey)
                        this.customComponentInfoMap[compKey] = customComponentInfo;
                }
            }
        });
    }

    scannerProjectOperators = () => {
        const compCtx = require.context('../framework', true, /\.(ts)$/);
        compCtx.keys().forEach(key => {
            const Clazz = compCtx(key).default;
            if (Clazz && AbstractOperator.isPrototypeOf(Clazz)) {
                let operatorInstance: AbstractOperator = new Clazz();
                let operateEnv = operatorInstance.getKey();
                this.abstractOperatorMap[operateEnv] = operatorInstance;
            }
        });
    }
}

const designerStarter = new DesignerStarter();
export default designerStarter;
