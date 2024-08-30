import AbstractManager from "./core/AbstractManager.ts";
import {action, makeObservable, observable} from "mobx";
import {DesignerMode, ProjectDataType} from "../DesignerType.ts";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import layerManager from "./LayerManager.ts";
import themeManager from "../header/items/theme/ThemeManager.ts";
// import bluePrintManager from "../blueprint/manager/BluePrintManager.ts";
import bluePrintGroupManager from "../blueprint/manager/BluePrintGroupManager.ts";
import FilterManager from "./FilterManager.ts";

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

    loaded: boolean = false;

    setLoaded = (loaded: boolean) => this.loaded = loaded;

    destroy(): void {
        canvasManager.destroy();
        layerManager.destroy();
        themeManager.destroy();
        // bluePrintManager.destroy();
        bluePrintGroupManager.destroy();
    }

    getData(): ProjectDataType {
        return {
            canvasManager: canvasManager.getData(),
            themeManager: themeManager.getData()!,
            layerManager: layerManager.getData(),
            // bluePrintManager: bluePrintManager.getData(),
            bluePrintGroupManager: bluePrintGroupManager.getData(),
            filterManager: FilterManager.getData(),
        };
    }

    init(data: ProjectDataType, mode: DesignerMode): void {
        console.log("编辑器初始化===》》》", data);
        data.canvasManager && canvasManager.init(data.canvasManager!);
        data.themeManager && themeManager.init(data.themeManager!);
        data.layerManager && layerManager.init(data.layerManager!);
        // data.bluePrintManager && bluePrintManager.init(data.bluePrintManager!, mode)
        data.bluePrintGroupManager && bluePrintGroupManager.init(data.bluePrintGroupManager!, mode)
        data.filterManager && FilterManager.init(data.filterManager!);
    }

}

const designerManager = new DesignerManager();
export default designerManager;
