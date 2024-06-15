import AbstractManager from "./core/AbstractManager.ts";
import {action, makeObservable, observable} from "mobx";
import {DesignerMode, ProjectDataType} from "../DesignerType.ts";
import CanvasManager from "../header/items/canvas/CanvasManager.ts";
import ThemeManager from "../header/items/theme/ThemeManager.ts";
import BluePrintManager from "../blueprint/manager/BluePrintManager.ts";
import FilterManager from "./FilterManager.ts";
import LayerManager from "./LayerManager.ts";
import BPExecutor from "../blueprint/core/BPExecutor.ts";

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
    public canvasManager = new CanvasManager();
    public layerManager = new LayerManager();
    public themeManager = new ThemeManager();
    public bluePrintManager = new BluePrintManager();
    public filterManager = new FilterManager();
    public bpExecutor: BPExecutor = new BPExecutor(this.bluePrintManager, this.layerManager);

    setLoaded = (loaded: boolean) => this.loaded = loaded;

    destroy = (): void => {
        this.canvasManager.destroy();
        this.layerManager.destroy();
        this.themeManager.destroy();
        this.bluePrintManager.destroy();
    }

    getData = (): ProjectDataType => {
        return {
            canvasManager: this.canvasManager.getData(),
            themeManager: this.themeManager.getData()!,
            layerManager: this.layerManager.getData(),
            bluePrintManager: this.bluePrintManager.getData(),
            filterManager: this.filterManager.getData(),
        };
    }

    init = (data: ProjectDataType, mode: DesignerMode): void => {
        data.canvasManager && this.canvasManager.init(data.canvasManager!);
        data.themeManager && this.themeManager.init(data.themeManager!);
        data.layerManager && this.layerManager.init(data.layerManager!);
        data.bluePrintManager && this.bluePrintManager.init(data.bluePrintManager!, mode)
        data.filterManager && this.filterManager.init(data.filterManager!);
    }

}

export default DesignerManager;