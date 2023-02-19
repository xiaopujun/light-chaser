import {action, makeAutoObservable, makeObservable, observable, runInAction} from "mobx";
import {
    ActiveProps,
    BaseInfo,
    BaseStyle,
    BgColorMode,
    BgConfig,
    BgFillType,
    BgMode,
    CanvasSetProps,
    ChartConfigsProps,
    ProjectConfig,
    SystemConfig
} from "../../../types/LcDesignerType";
import {LcLayout} from "../type/LcDesignerTypes";
import * as _ from "lodash";
import {Layout} from "react-grid-layout";
import {lcCompInits} from "../index";

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
    bgConfig: BgConfig = {
        bgMode: BgMode.NONE,
        bgImgSize: [1920, 1080],
        bgImgUrl: '',
        bgFillType: BgFillType.NONE,
        bgColorMode: BgColorMode.SINGLE,
        bgColor: '',
    };
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
        elemCount: 0,
        saveType: 'local'
    };
    /**
     * 图表配置
     */
    chartConfigs: ChartConfigsProps = {};
    /**
     * 布局配置
     */
    layoutConfigs: LcLayout[] = [];

    /**
     * 设置布局id
     */
    setId = (id: number) => {
        console.log('setId', id);
        runInAction(() => {
            this.id = id;
        })
    }

    /**
     * 设置图表配置
     */
    setChartConfigs = (chartConfigs: ChartConfigsProps) => {
        console.log('setChartConfigs', chartConfigs);
        runInAction(() => {
            this.chartConfigs = chartConfigs;
        })
    }

    /**
     * 设置布局配置
     */
    setLayoutConfigs = (layoutConfigs: LcLayout[]) => {
        console.log('setLayoutConfigs', layoutConfigs);
        runInAction(() => {
            this.layoutConfigs = layoutConfigs;
        })
    }

    /**
     * 清空store
     */
    clearStore = () => {
        this.id = -1;
        this.canvasConfig = {};
        this.activated = {};
        this.bgConfig = {};
        this.systemConfig = {};
        this.projectConfig = {};
        this.chartConfigs = {};
        this.layoutConfigs = [];
    }
    /**
     * 添加元素
     */
    addItem = (item: LcLayout) => {
        console.log('addItem', item);
        this.layoutConfigs?.push(item);
        let initObj: any = lcCompInits[item.name + "Init"];
        let initData: any = initObj.getInitConfig()
        initData.baseInfo = {...initData.baseInfo, ...{id: this.projectConfig.elemCount}}
        if (this.chartConfigs)
            this.chartConfigs[this.projectConfig.elemCount + ""] = initData;
        let {elemCount = 0} = this.projectConfig!;
        this.projectConfig.elemCount = ++elemCount;

    }
    /**
     * 删除元素
     */
    delItem = (id: string | number) => {
        console.log('delItem', id);
        _.remove(this.layoutConfigs, function (item) {
            return item?.id === id;
        })
        delete this.chartConfigs[id + ''];
        if (this.activated && id === this.activated.id) {
            this.activated.id = -1;
            this.activated.type = "";
        }
    }
    /**
     * 更新布局
     */
    updateLayout = (item: Layout) => {
        console.log('updateLayout', item);
        const {i, x, y, w, h} = item;
        for (let index = 0; index < this.layoutConfigs.length; index++) {
            if (this.layoutConfigs[index].i === i) {
                this.layoutConfigs[index] = {...this.layoutConfigs[index], ...{x, y, w, h}}
                break;
            }
        }
    }
    /**
     * 更新激活状态元素
     */
    updateActive = (data: ActiveProps) => {
        console.log('updateActive', data);
        runInAction(() => {
            this.activated = {...this.activated, ...data};
        })
    }
    /**
     * 更新组件基础样式
     */
    updateBaseStyle = (data: BaseStyle) => {
        console.log('updateBaseStyle', data);
        const {id} = this.activated!;
        let charConfig = this.chartConfigs[id + ''];
        let baseConfig = charConfig?.baseStyle;
        if (charConfig && baseConfig)
            charConfig.baseStyle = {...baseConfig, ...data};
    }
    /**
     * 更新图表组件配置
     */
    updateChartProps = (data: any) => {
        console.log('updateChartProps', data);
        let activeConfig = this.chartConfigs[this.activated?.id + ''];
        if (activeConfig)
            activeConfig.chartProps = _.merge(activeConfig.chartProps, data);
    }
    /**
     * 更新基础信息
     */
    updateBaseInfo = (data: BaseInfo) => {
        console.log('updateBaseInfo', data);
        let {id = -1} = this.activated;
        let chartConfig = this.chartConfigs[id];
        if (chartConfig)
            chartConfig.baseInfo = {...chartConfig.baseInfo, ...data};
    }
    /**
     * 更新画布设置
     */
    updateCanvasConfig = (data: CanvasSetProps) => {
        console.log('updateCanvasConfig', data);
        runInAction(() => {
            this.canvasConfig = {...this.canvasConfig, ...data};
        })
    }
    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: ProjectConfig) => {
        console.log('updateProjectConfig', data);
        runInAction(() => {
            this.projectConfig = {...this.projectConfig, ...data};
        })
    }
    /**
     * 更新背景配置
     */
    updateBgConfig = (data: BgConfig) => {
        console.log('updateBgConfig', data);
        runInAction(() => {
            this.bgConfig = {...this.bgConfig, ...data};
        })
    }
    /**
     * 更新系统配置
     */
    updateSystemConfig = () => {

    }
}

const lcDesignerContentStore = new LcDesignerContentStore();

export default lcDesignerContentStore;
export {LcDesignerContentStore};