import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import AbstractConvert from "../../framework/convert/AbstractConvert";
import {componentCategorize} from "../left/compoent-lib/ComponentCategorize";
import {SaveType} from "../DesignerType.ts";

export abstract class AbstractDesignerLoader {

    //自定义组件信息映射
    public definitionMap: Record<string, AbstractDefinition> = {};
    //数据转换器
    public convertMap: { [key: string]: AbstractConvert } = {};

    /**
     * 加载设计器
     */
    public load(id: string, type: SaveType): void {
        //扫描组件
        this.scanComponents();
        //初始化项目
        this.initProject(id, type);
    }

    /**
     * 扫描设计器组件
     */
    protected scanComponents(): void {
        const glob = import.meta.glob('../../comps/**/*.ts', {eager: true}) as Record<string, any>;
        for (const key of Object.keys(glob)) {
            const Clazz = glob[key]?.default;
            if (Clazz && AbstractDefinition.isPrototypeOf(Clazz)) {
                const definition: AbstractDefinition = new Clazz();
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
            } else if (Clazz && AbstractConvert.isPrototypeOf(Clazz)) {
                const convert: AbstractConvert = new Clazz();
                const convertKey = convert.getKey();
                this.convertMap[convertKey] = convert;
            }
        }
    }

    /**
     * 加载设计器项目数据
     */
    protected abstract initProject(id: string, type: SaveType): void;
}