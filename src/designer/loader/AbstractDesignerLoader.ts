import {componentCategorize} from "../left/compoent-lib/ComponentCategorize";
import AbstractDesignerDefinition from "../../framework/core/AbstractDesignerDefinition.ts";

export abstract class AbstractDesignerLoader {

    //自定义组件信息映射
    public definitionMap: Record<string, AbstractDesignerDefinition> = {};

    /**
     * 加载设计器
     */
    public load(id: string): void {
        //扫描组件
        this.scanComponents();
        //初始化项目
        this.initProject(id);
    }

    /**
     * 扫描设计器组件
     */
    protected scanComponents(): void {
        const glob = import.meta.glob('../../comps/**/*.ts', {eager: true}) as Record<string, any>;
        for (const key of Object.keys(glob)) {
            const Clazz = glob[key]?.default;
            if (Clazz && AbstractDesignerDefinition.isPrototypeOf(Clazz)) {
                const definition: AbstractDesignerDefinition = new Clazz();
                //获取组件的基础信息
                if (typeof definition.getBaseInfo === "function") {
                    const compKey = definition.getBaseInfo().compKey;
                    if (compKey)
                        this.definitionMap[compKey] = definition;
                }
                //获取自定义分类
                if (typeof definition.getCategorize === "function") {
                    const categorize = definition.getCategorize();
                    if (categorize) {
                        if (!categorize.icon) {
                            console.error("自定义组件的分类必须指定icon");
                            continue;
                        } else
                            componentCategorize.push(categorize);
                    }
                }
                //获取自定义子类型
                if (typeof definition.getSubCategorize === "function") {
                    const subCategorize = definition.getSubCategorize();
                    if (subCategorize) {
                        if (!subCategorize.parentKey) {
                            console.error("自定义组件的子类型必须指定parentKey");
                            continue;
                        } else
                            componentCategorize.push(subCategorize);
                    }
                }
            }
        }
    }


    /**
     * 加载设计器项目数据
     */
    protected abstract initProject(id: string): void;
}