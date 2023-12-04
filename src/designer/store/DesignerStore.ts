import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import {isEqual} from "lodash";
import {
    CanvasConfig,
    IExtendParams,
    ILayerItem,
    ProjectConfig,
    ProjectDataType,
    ProjectState,
    SaveType,
    Statistic,
    ThemeItemType,
} from "../DesignerType";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import historyRecordOperateProxy from "../operate-provider/undo-redo/HistoryRecordOperateProxy";
import ObjectUtil from "../../utils/ObjectUtil";

/**
 * 设计器核心状态管理类，记录了设计器中的核心数据。包括组件配置，组件布局。 全局设置等。
 */
class DesignerStore {
    constructor() {
        makeObservable(this, {
            canvasConfig: observable,
            projectConfig: observable,
            layerConfigs: observable.shallow,
            statisticInfo: observable,
            themeConfig: observable,
            extendParams: observable,
            loaded: observable,
            doInit: action,
            addItem: action,
            delItem: action,
            setLoaded: action,
            updateLayer: action,
            updateThemeConfig: action,
            flashGlobalTheme: action,
            updateCanvasConfig: action,
            updateProjectConfig: action,
            copyItem: action,
            delLayout: action,
        });
    }

    /**
     * 大屏id
     */
    id: string = "";

    loaded: boolean = false;

    /**
     * 画布设置
     */
    canvasConfig: CanvasConfig = {
        rasterize: false, //是否栅格化
        dragStep: 1, //栅格化拖拽步长
        resizeStep: 1, //栅格化缩放步长
        width: 1920, //画布宽
        height: 1080, //画布高
    };

    /**
     * 项目设置
     */
    projectConfig: ProjectConfig = {
        name: "", //项目名称
        des: "", //项目描述
        state: ProjectState.DRAFT, //项目状态
        createTime: "", //创建时间
        updateTime: "", //更新时间
        saveType: SaveType.LOCAL, //存储类型
    };

    elemConfigs: { [key: string]: any } | null = {};

    /**
     * 画布上组件id与其实例对象的映射
     */
    compController: { [key: string]: AbstractDesignerController } = {};

    /**
     * 布局配置
     */
    layerConfigs: { [key: string]: ILayerItem } = {};

    /**
     * 统计信息
     */
    statisticInfo: Statistic = {
        //元素个数
        count: 0,
    };

    /**
     * 主题
     */
    themeConfig: Array<ThemeItemType> | null = [
        {
            id: "0",
            name: "科技风格(默认主题)",
            colors: {
                main: "#00dfff",
                mainText: "#62edff",
                subText: "#4ca4b1",
                background: "#00dfff33",
                supplementFirst: "#38929f",
                supplementSecond: "#1790a2",
            },
        },
    ];

    /**
     * 扩展参数
     */
    extendParams: IExtendParams = {
        maxLevel: 0,
        minLevel: 0,
    };

    /**
     * 保存的事件间隔
     */
    lastTimeSave: number = Date.now();

    setLastTimeSave = (time: number) => {
        this.lastTimeSave = time;
    }

    /**
     * 初始化store
     */
    doInit = (store: ProjectDataType) => {
        this.id = store.id ?? this.id;
        this.canvasConfig = store.canvasConfig
            ? {...this.canvasConfig, ...store.canvasConfig}
            : this.canvasConfig;
        this.projectConfig = store.projectConfig
            ? {...this.projectConfig, ...store.projectConfig}
            : this.projectConfig;
        this.elemConfigs = store.elemConfigs
            ? {...this.elemConfigs, ...store.elemConfigs}
            : this.elemConfigs;
        this.layerConfigs = store.layerConfigs || this.layerConfigs;
        this.statisticInfo = store.statisticInfo
            ? {...this.statisticInfo, ...store.statisticInfo}
            : this.statisticInfo;
        this.themeConfig = store.themeConfig || this.themeConfig;
        this.extendParams = store.extendParams
            ? {...this.extendParams, ...store.extendParams}
            : this.extendParams;
    };

    /**
     * 获取store数据
     */
    getData(): ProjectDataType {
        let elemConfigs: { [key: string]: any } = {};
        Object.keys(this.compController).forEach((key) => {
            elemConfigs[key] = this.compController[key].getConfig();
        });
        return {
            id: this.id,
            canvasConfig: toJS(this.canvasConfig),
            projectConfig: toJS(this.projectConfig),
            elemConfigs: elemConfigs,
            layerConfigs: toJS(this.layerConfigs),
            statisticInfo: toJS(this.statisticInfo),
            themeConfig: toJS(this.themeConfig)!,
            extendParams: toJS(this.extendParams),
        };
    }

    /**
     * 清空store
     */
    doDestroy = () => {
        this.id = "";
        this.canvasConfig = {};
        this.projectConfig = {};
        this.elemConfigs = {};
        this.layerConfigs = {};
        this.statisticInfo = {};
        this.themeConfig = null;
        this.extendParams = {};
    };

    /**
     * 设置布局id
     */
    setId = (id: string) => {
        runInAction(() => {
            this.id = id;
        });
    };

    setLoaded = (loaded: boolean) => {
        this.loaded = loaded;
    }

    /**
     * 添加元素
     */
    addItem = (item: ILayerItem) => {
        this.layerConfigs[item.id + ""] = item;
        if (this.statisticInfo)
            this.statisticInfo.count = Object.keys(this.layerConfigs).length;
    };

    /**
     * 删除元素
     */
    delItem = (ids: string[]) => {
        for (const id of ids) {
            delete this.layerConfigs[id];
            delete this.compController[id];
        }
    };

    /**
     * 更新布局
     */
    updateLayer = (items: ILayerItem[], reRender: boolean = true) => {
        for (const item of items) {
            let oldItem = this.layerConfigs[item.id + ""];
            if (!isEqual(oldItem, item))
                this.layerConfigs[item.id + ""] = reRender ? {...ObjectUtil.merge(oldItem, item)} : ObjectUtil.merge(oldItem, item);
        }
    };

    /**
     * 直接删除只能删除type = group的图层数据，要同时删除组件布局数据，需要调用delItem
     * @param ids
     */
    delLayout = (ids: string[]) => {
        for (const id of ids) {
            if (this.layerConfigs[id] && this.layerConfigs[id].type === "group")
                delete this.layerConfigs[id];
        }
    }

    updateThemeConfig = (data: any) => {
        this.themeConfig = data;
    };

    flashGlobalTheme = (newTheme: ThemeItemType) => {
        this.compController && Object.keys(this.compController).forEach((key: string) => {
            let instance = this.compController[key];
            if (instance)
                instance.updateTheme(newTheme);
        });
    };

    /**
     * 更新画布设置
     */
    updateCanvasConfig = (data: CanvasConfig) => {
        this.canvasConfig = {...this.canvasConfig, ...data}
    }

    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: ProjectConfig) => {
        this.projectConfig = {...this.projectConfig, ...data};
    };

    copyItem = (ids: string[]) => {
        return historyRecordOperateProxy.doCopy(ids);
    };
}

const designerStore = new DesignerStore();

export default designerStore;
export {DesignerStore};
