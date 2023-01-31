import {makeAutoObservable} from "mobx";
import {
    ActiveProps, BgConfig,
    CanvasSetProps,
    ChartConfigsProps,
    ProjectConfig,
    SystemConfig
} from "../../../types/LcDesignerType";

class LcDesignerContentStore {
    constructor() {
        makeAutoObservable(this);
    }

    /**
     * 大屏id
     */
    id = -1;
    /**
     * 画布设置
     */
    canvasConfig: CanvasSetProps = {
        elemInterval: 0,
        columns: 0,
        baseHeight: 5,
        canvasScale: [16, 9]
    };
    /**
     * 激活状态属性
     */
    activated: ActiveProps = {
        id: -1,
        type: ''
    };
    /**
     * 背景设置
     */
    bgConfig: BgConfig | undefined | null;
    /**
     * 系统配置
     */
    systemConfig: SystemConfig = {
        saveType: 'local'
    };
    /**
     * 项目设置
     */
    projectConfig: ProjectConfig = {
        screenName: '',
        screenDes: '',
        screenState: '',
        screenWidth: 1920,
        screenHeight: 1080,
        createTime: '',
        updateTime: '',
        elemCount: 0
    };
    /**
     * 图表配置
     */
    chartConfigs: ChartConfigsProps = {};
    /**
     * 布局配置
     */
    layoutConfigs: Array<any> = [];


}

const lcDesignerContentStore = new LcDesignerContentStore();

export default lcDesignerContentStore;