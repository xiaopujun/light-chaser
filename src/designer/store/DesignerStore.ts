import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import {isEqual} from "lodash";
import {ILayerItem, IProjectInfo, ProjectDataType, ProjectState, SaveType, ThemeItemType,} from "../DesignerType";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController";
import historyRecordOperateProxy from "../operate-provider/undo-redo/HistoryRecordOperateProxy";
import ObjectUtil from "../../utils/ObjectUtil";
import canvasManager from "../header/items/canvas/CanvasManager.ts";
import themeManager from "../header/items/theme/ThemeManager.ts";

/**
 * 设计器核心状态管理类，记录了设计器中的核心数据。包括组件配置，组件布局。 全局设置等。
 */
class DesignerStore {
    constructor() {
        makeObservable(this, {
            projectConfig: observable,
            layerConfigs: observable.shallow,
            loaded: observable,
            doInit: action,
            addItem: action,
            delItem: action,
            setLoaded: action,
            updateLayer: action,
            flashGlobalTheme: action,
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

    layerHeader: string | undefined = undefined;
    layerTail: string | undefined = undefined;

    /**
     * 初始化store
     */
    doInit = (store: ProjectDataType) => {
        this.id = store.id ?? this.id;
        this.elemConfigs = store.elemConfigs
            ? {...this.elemConfigs, ...store.elemConfigs}
            : this.elemConfigs;
        this.layerConfigs = store.layerConfigs || this.layerConfigs;
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
            canvasConfig: canvasManager.getData(),
            elemConfigs: elemConfigs,
            layerConfigs: toJS(this.layerConfigs),
            themeConfig: themeManager.getData()!,
            layerHeader: this.layerHeader,
            layerTail: this.layerTail,
        };
    }


    setLoaded = (loaded: boolean) => this.loaded = loaded;

    /**
     * 添加元素
     */
    addItem = (layer: ILayerItem) => this.layerConfigs[layer.id + ""] = layer;

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

    reRenderLayer = () => runInAction(() => this.layerConfigs = {...this.layerConfigs});

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

    flashGlobalTheme = (newTheme: ThemeItemType) => {
        this.compController && Object.keys(this.compController).forEach((key: string) => {
            const instance = this.compController[key];
            if (instance)
                instance.updateTheme(newTheme);
        });
    };

    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: IProjectInfo) => this.projectConfig = {...this.projectConfig, ...data};

    copyItem = (ids: string[]) => historyRecordOperateProxy.doCopy(ids);
}

const designerStore = new DesignerStore();

export default designerStore;
