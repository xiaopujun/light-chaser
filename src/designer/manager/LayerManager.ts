import {action, makeObservable, observable, runInAction, toJS} from "mobx";
import {isEqual} from "lodash";
import {ILayerItem, LayerManagerDataType, ThemeItemType,} from "../DesignerType.ts";
import AbstractDesignerController from "../../framework/core/AbstractDesignerController.ts";
import historyRecordOperateProxy from "../operate-provider/undo-redo/HistoryRecordOperateProxy.ts";
import ObjectUtil from "../../utils/ObjectUtil.ts";
import AbstractManager from "./core/AbstractManager.ts";

/**
 * 设计器核心状态管理类，记录了设计器中的核心数据。包括组件配置，组件布局。 全局设置等。
 */
class LayerManager extends AbstractManager<LayerManagerDataType> {

    constructor() {
        super();
        makeObservable(this, {
            layerConfigs: observable.shallow,
            init: action,
            destroy: action,
            addItem: action,
            delItem: action,
            updateLayer: action,
            flashGlobalTheme: action,
            copyItem: action,
            delLayout: action,
        });
    }

    /**
     * 每个图层元素的配置数据
     */
    elemConfigs: Record<string, any> | null = {};

    /**
     * 画布上图层组件id与其实例对象的映射
     */
    compController: Record<string, AbstractDesignerController> = {};

    /**
     * 布局配置
     */
    layerConfigs: Record<string, ILayerItem> = {};

    /**
     * 图层头指针
     */
    layerHeader: string | undefined = undefined;

    /**
     * 图层尾指针
     */
    layerTail: string | undefined = undefined;

    /**
     * 是否开启图层原有事件
     */
    enableEvent: boolean = false;

    setEnableEvent = (enable: boolean) => {
        this.enableEvent = enable;
        //重新渲染所有图层
        this.reRenderLayer();
    };

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


    copyItem = (ids: string[]) => historyRecordOperateProxy.doCopy(ids);

    /**
     * 获取store数据
     */
    getData(): LayerManagerDataType {
        const elemConfigs: { [key: string]: any } = {};
        Object.keys(this.compController).forEach((key) => {
            elemConfigs[key] = this.compController[key].getConfig();
        });
        return {
            elemConfigs: elemConfigs,
            layerConfigs: toJS(this.layerConfigs),
            layerHeader: this.layerHeader,
            layerTail: this.layerTail,
        };
    }

    public init(data: LayerManagerDataType): void {
        this.elemConfigs = data.elemConfigs || this.elemConfigs;
        this.layerConfigs = data.layerConfigs || this.layerConfigs;
        this.layerHeader = data.layerHeader || this.layerHeader;
        this.layerTail = data.layerTail || this.layerTail;
    }

    public destroy(): void {
        this.elemConfigs = {};
        this.layerConfigs = {};
        this.layerHeader = undefined;
        this.layerTail = undefined;
    }
}

const layerManager = new LayerManager();

export default layerManager;
