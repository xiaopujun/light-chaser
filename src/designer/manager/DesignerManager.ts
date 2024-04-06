import AbstractManager from "./core/AbstractManager.ts";
import {action, makeObservable, observable} from "mobx";
import {DesignerMode, ProjectDataType} from "../DesignerType.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import layerManager from "./LayerManager.ts";
import themeManager from "../header/items/theme/ThemeManager.ts";
import bluePrintManager from "../blueprint/manager/BluePrintManager.ts";

/**
 * 整个设计器的所有数据初始化和数据聚合，统一通过该管理器进行分发和处理
 */
class DesignerManager extends AbstractManager<ProjectDataType> {
    constructor() {
        super();
        makeObservable(this, {
            loaded: observable,
            setLoaded: action,
        })
    }

    /**
     * 大屏id
     */
    id: string = "";

    loaded: boolean = false;

    setLoaded = (loaded: boolean) => this.loaded = loaded;

    destroy(): void {
        this.id = "";
        canvasManager.destroy();
        layerManager.destroy();
        themeManager.destroy();
        bluePrintManager.destroy();
    }

    getData(): ProjectDataType {
        return {
            id: this.id,
            canvasConfig: canvasManager.getData(),
            themeConfig: themeManager.getData()!,
            elemConfigs: layerManager.getData().elemConfigs,
            layerConfigs: layerManager.getData().layerConfigs,
            layerHeader: layerManager.getData().layerHeader,
            layerTail: layerManager.getData().layerTail,
            bpAPMap: bluePrintManager.getData().bpAPMap,
            bpLines: bluePrintManager.getData().bpLines,
            bpAPLineMap: bluePrintManager.getData().bpAPLineMap,
            bpNodeConfigMap: bluePrintManager.getData().bpNodeConfigMap,
            bpNodeLayoutMap: bluePrintManager.getData().bpNodeLayoutMap,
        };
    }

    init(data: ProjectDataType, mode: DesignerMode): void {
        this.id = data.id!;
        canvasManager.init(data.canvasConfig!);
        themeManager.init(data.themeConfig!);
        layerManager.init({
            elemConfigs: data.elemConfigs,
            layerConfigs: data.layerConfigs,
            layerHeader: data.layerHeader,
            layerTail: data.layerTail,
        });
        bluePrintManager.init({
            bpAPMap: data?.bpAPMap,
            bpLines: data?.bpLines,
            bpAPLineMap: data?.bpAPLineMap,
            bpNodeLayoutMap: data?.bpNodeLayoutMap,
            bpNodeConfigMap: data?.bpNodeConfigMap,
        }, mode)
    }

}

const designerManager = new DesignerManager();
export default designerManager;