import AbstractManager from "./core/AbstractManager.ts";
import {ClazzTemplate, DesignerMode, ProjectDataType} from "../DesignerType.ts";
import CanvasManager from "../header/items/canvas/CanvasManager.ts";
import ThemeManager from "../header/items/theme/ThemeManager.ts";
import BluePrintManager from "../blueprint/manager/BluePrintManager.ts";
import FilterManager from "./FilterManager.ts";
import LayerManager from "./LayerManager.ts";
import BPExecutor from "../blueprint/core/BPExecutor.ts";
import AbstractDesignerDefinition from "../../framework/core/AbstractDesignerDefinition.ts";
import {AbstractBPNodeController} from "../blueprint/node/core/AbstractBPNodeController.ts";
import {componentCategorize} from "../left/compoent-lib/ComponentCategorize.ts";

/**
 * 整个设计器的所有数据初始化和数据聚合，统一通过该管理器进行分发和处理
 */
export default class DesignerManager extends AbstractManager<ProjectDataType> {

    //自定义组件信息映射
    public static definitionMap: Record<string, AbstractDesignerDefinition> = {};
    //蓝图节点控制器模板
    public static bpControllerMap: Record<string, ClazzTemplate<AbstractBPNodeController>> = {};

    public canvasManager = new CanvasManager();
    public layerManager = new LayerManager();
    public themeManager = new ThemeManager();
    public bluePrintManager = new BluePrintManager();
    public filterManager = new FilterManager();
    public bpExecutor: BPExecutor = new BPExecutor(this.bluePrintManager, this.layerManager);

    public destroy = (): void => {
        this.canvasManager.destroy();
        this.layerManager.destroy();
        this.themeManager.destroy();
        this.bluePrintManager.destroy();
    }

    public getData = (): ProjectDataType => {
        return {
            canvasManager: this.canvasManager.getData(),
            themeManager: this.themeManager.getData()!,
            layerManager: this.layerManager.getData(),
            bluePrintManager: this.bluePrintManager.getData(),
            filterManager: this.filterManager.getData(),
        };
    }

    public init = (data: ProjectDataType, mode: DesignerMode): void => {
        data.canvasManager && this.canvasManager.init(data.canvasManager!);
        data.themeManager && this.themeManager.init(data.themeManager!);
        data.layerManager && this.layerManager.init(data.layerManager!);
        data.bluePrintManager && this.bluePrintManager.init(data.bluePrintManager!, mode)
        data.filterManager && this.filterManager.init(data.filterManager!);
    }

    public scanComponents(): void {
        const glob = import.meta.glob('../../comps/**/*.ts', {eager: true}) as Record<string, any>;
        for (const key of Object.keys(glob)) {
            const Clazz = glob[key]?.default;
            if (Clazz && AbstractDesignerDefinition.isPrototypeOf(Clazz)) {
                const definition: AbstractDesignerDefinition = new Clazz();
                //获取组件的基础信息
                if (typeof definition.getBaseInfo === "function") {
                    const compKey = definition.getBaseInfo().compKey;
                    if (compKey)
                        DesignerManager.definitionMap[compKey] = definition;
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
                        } else
                            componentCategorize.push(subCategorize);
                    }
                }
            }
        }
    }

    public scanBPController(): void {
        const glob = import.meta.glob('../blueprint/node/core/impl/**/*.ts', {eager: true}) as Record<string, any>;
        for (const key of Object.keys(glob)) {
            const Clazz = glob[key]?.default as ClazzTemplate<AbstractBPNodeController>;
            if (Clazz && AbstractBPNodeController.isPrototypeOf(Clazz)) {
                DesignerManager.bpControllerMap[Clazz.name.replaceAll("Controller", "")] = Clazz;
            }
        }
    }

}
