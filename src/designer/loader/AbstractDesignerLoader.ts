import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import {HeaderItemProps} from "../header/HeaderTypes";
import AbstractConvert from "../../framework/convert/AbstractConvert";
import AbstractLoader from "./AbstractLoader";
import {componentCategorize} from "../left/compoent-lib/ComponentCategorize";

export abstract class AbstractDesignerLoader extends AbstractLoader {

    //自定义组件信息映射
    public definitionMap: Record<string, AbstractDefinition> = {};
    //头部操作菜单实例
    public headerItemInstances: HeaderItemProps[] = [];
    //数据转换器
    public convertMap: { [key: string]: AbstractConvert } = {};

    /**
     * 加载设计器
     */
    public load(): void {
        //扫描组件
        this.scanComponents();
        //初始化项目
        this.initProject();
    }

    /**
     * 扫描设计器组件
     */
    protected abstract scanComponents(): void;

    /**
     * 加载设计器项目数据
     */
    protected abstract initProject(): void;

    /**
     * 扫描自定义组件
     */
    protected scannerCustomComponents(): void {
        const compCtx: any = import.meta.glob('../../comps/**/*.ts', {eager: true});
        Object.keys(compCtx).forEach(key => {
            const Clazz = compCtx[key]?.default;
            if (Clazz && AbstractDefinition.isPrototypeOf(Clazz)) {
                let definition: AbstractDefinition = new Clazz();
                //获取组件的基础信息
                if (typeof definition.getBaseInfo === "function") {
                    let compKey = definition.getBaseInfo().compKey;
                    if (compKey)
                        this.definitionMap[compKey] = definition;
                }
                //获取自定义分类
                if (typeof definition.getCategorize === "function") {
                    let categorize = definition.getCategorize();
                    if (categorize) {
                        if (!categorize.icon) {
                            console.error("自定义组件的分类必须指定icon");
                            return;
                        } else
                            componentCategorize.push(categorize);
                    }
                }
                //获取自定义子类型
                if (typeof definition.getSubCategorize === "function") {
                    let subCategorize = definition.getSubCategorize();
                    if (subCategorize) {
                        if (!subCategorize.parentKey) {
                            console.error("自定义组件的子类型必须指定parentKey");
                            return;
                        } else
                            componentCategorize.push(subCategorize);
                    }
                }
            } else if (Clazz && AbstractConvert.isPrototypeOf(Clazz)) {
                let convert: AbstractConvert = new Clazz();
                let convertKey = convert.getKey();
                this.convertMap[convertKey] = convert;
            }
        });
    }
}