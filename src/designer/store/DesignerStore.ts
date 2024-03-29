import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import {isEqual} from "lodash";
import {
    CanvasConfig,
    ILayerItem,
    IProjectInfo,
    ProjectDataType,
    ProjectState,
    SaveType,
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
            themeConfig: observable,
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
    projectConfig: IProjectInfo = {
        name: "", //项目名称
        des: "", //项目描述
        state: ProjectState.DRAFT, //项目状态
        createTime: "", //创建时间
        updateTime: "", //更新时间
        saveType: SaveType.LOCAL, //存储类型
    };

    elemConfigs: Record<string, any> | null = {};

    /**
     * 画布上组件id与其实例对象的映射
     */
    compController: Record<string, AbstractDesignerController> = {};

    /**
     * 布局配置
     */
    layerConfigs: Record<string, ILayerItem> = {};

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

    layerHeader: string | undefined = undefined;
    layerTail: string | undefined = undefined;

    /**
     * 初始化store
     */
    doInit = (store: ProjectDataType) => {
        this.id = store.id ?? this.id;
        this.canvasConfig = store.canvasConfig
            ? {...this.canvasConfig, ...store.canvasConfig}
            : this.canvasConfig;
        this.elemConfigs = store.elemConfigs
            ? {...this.elemConfigs, ...store.elemConfigs}
            : this.elemConfigs;
        this.layerConfigs = store.layerConfigs || this.layerConfigs;
        this.themeConfig = store.themeConfig || this.themeConfig;
        this.layerHeader = store.layerHeader || this.layerHeader;
        this.layerTail = store.layerTail || this.layerTail;
    };

    /**
     * 获取store数据
     */
    getData(): ProjectDataType {
        const elemConfigs: { [key: string]: any } = {};
        Object.keys(this.compController).forEach((key) => {
            elemConfigs[key] = this.compController[key].getConfig();
        });
        return {
            canvasConfig: toJS(this.canvasConfig),
            elemConfigs: elemConfigs,
            layerConfigs: toJS(this.layerConfigs),
            themeConfig: toJS(this.themeConfig)!,
            layerHeader: this.layerHeader,
            layerTail: this.layerTail,
        };
    }


    setLoaded = (loaded: boolean) => {
        this.loaded = loaded;
    }

    /**
     * 添加元素
     */
    addItem = (layer: ILayerItem) => {
        this.layerConfigs[layer.id + ""] = layer;
    };

    /**
     * 删除元素
     */
    delItem = (ids: string[]) => {
        for (const id of ids) {
            const controller = this.compController[id];
            if (controller)
                controller.destroy();
            delete this.layerConfigs[id];
            delete this.compController[id];
        }
    };

    /**
     * 更新布局
     */
    updateLayer = (items: ILayerItem[], reRender: boolean = true) => {
        for (const item of items) {
            const oldItem = this.layerConfigs[item.id + ""];
            if (!isEqual(oldItem, item))
                this.layerConfigs[item.id + ""] = reRender ? {...ObjectUtil.merge(oldItem, item)} : ObjectUtil.merge(oldItem, item);
        }
    };

    reRenderLayer = () => {
        runInAction(() => this.layerConfigs = {...this.layerConfigs})
    }

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

    updateThemeConfig = (data: Array<ThemeItemType>) => {
        this.themeConfig = data;
    };

    flashGlobalTheme = (newTheme: ThemeItemType) => {
        this.compController && Object.keys(this.compController).forEach((key: string) => {
            const instance = this.compController[key];
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
    updateProjectConfig = (data: IProjectInfo) => {
        this.projectConfig = {...this.projectConfig, ...data};
    };

    copyItem = (ids: string[]) => {
        return historyRecordOperateProxy.doCopy(ids);
    };
}

const designerStore = new DesignerStore();

export default designerStore;
export {DesignerStore};
