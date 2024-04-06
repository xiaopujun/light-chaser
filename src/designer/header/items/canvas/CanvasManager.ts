import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import AbstractManager from "../../../manager/core/AbstractManager.ts";
import {CanvasConfig} from "../../../DesignerType.ts";

class CanvasManager extends AbstractManager<CanvasConfig> {

    constructor() {
        super();
        makeObservable(this, {
            canvasVisible: observable,
            canvasConfig: observable,
            setCanvasVisible: action,
            updateCanvasConfig: action,
        })
    }

    canvasVisible: boolean = false;

    setCanvasVisible = (visible: boolean) => this.canvasVisible = visible;

    canvasConfig: CanvasConfig = {
        rasterize: false, //是否栅格化
        dragStep: 1, //栅格化拖拽步长
        resizeStep: 1, //栅格化缩放步长
        width: 1920, //画布宽
        height: 1080, //画布高
    };

    updateCanvasConfig = (data: CanvasConfig) => this.canvasConfig = {...this.canvasConfig, ...data};

    public init(data: CanvasConfig): void {
        runInAction(() => {
            this.canvasConfig = data ? {...this.canvasConfig, ...data} : this.canvasConfig;
        })
    }

    public getData = (): CanvasConfig => {
        return toJS(this.canvasConfig!)
    }

    public destroy = () => {
        runInAction(() => {
            this.canvasConfig = {}
        });
    }

}

const canvasHdStore = new CanvasManager();
export default canvasHdStore;