import AbstractManager from "./core/AbstractManager.ts";
import {action, makeObservable, observable} from "mobx";
import {ProjectDataType} from "../DesignerType.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import layerManager from "./LayerManager.ts";
import themeManager from "../header/items/theme/ThemeManager.ts";

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
        };
    }

    init(data: ProjectDataType): void {
        this.id = data.id!;
        canvasManager.init(data.canvasConfig!);
        themeManager.init(data.themeConfig!);
        layerManager.init({
            elemConfigs: data.elemConfigs,
            layerConfigs: data.layerConfigs,
            layerHeader: data.layerHeader,
            layerTail: data.layerTail,
        });
    }

}

const designerManager = new DesignerManager();
export default designerManager;