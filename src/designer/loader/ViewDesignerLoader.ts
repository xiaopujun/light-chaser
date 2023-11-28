import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import AbstractConvert from "../../framework/convert/AbstractConvert";
import {AbstractOperator} from "../../framework/operate/AbstractOperator";
import designerStore from "../store/DesignerStore";
import {SaveType} from "../DesignerType";
import eventOperateStore from "../operate-provider/EventOperateStore";
import bpStore from "../../blueprint/store/BPStore";
import bpLeftStore from "../../blueprint/left/BPLeftStore";
import {AbstractBPNodeController} from "../../blueprint/node/core/AbstractBPNodeController";
import bpNodeControllerMap from "../../blueprint/node/core/impl/BPNodeControllerMap";
import {ClazzTemplate} from "../../comps/common-component/common-types";
import URLUtil from "../../utils/URLUtil";
import {message} from "antd";

/**
 * 展示模式下的设计器加载器
 */
export class ViewDesignerLoader extends AbstractDesignerLoader {

    private static instance: ViewDesignerLoader | null = null;

    public static getInstance(): ViewDesignerLoader {
        if (!this.instance)
            this.instance = new ViewDesignerLoader();
        return this.instance;
    }

    protected scanComponents(): void {
        this.scannerCustomComponents();
        this.scannerProjectOperators();
    }

    protected loadProjectData(): void {
        let urlParams = URLUtil.parseUrlParams();
        const {action} = urlParams;
        if ("view" === action)
            this.initExistProject();
        else
            throw new Error('action is error')
    }

    //扫描自定义组件
    private scannerCustomComponents(): void {
        const compCtx: any = import.meta.glob('../../comps/*/*/*.ts', {
            eager: true,
        });
        Object.keys(compCtx).forEach(key => {
            const Clazz = compCtx[key]?.default;
            if (Clazz && AbstractDefinition.isPrototypeOf(Clazz)) {
                let customComponentInfo: AbstractDefinition = new Clazz();
                if (typeof customComponentInfo.getBaseInfo === "function") {
                    let compKey = customComponentInfo.getBaseInfo().compKey;
                    if (compKey)
                        this.customComponentInfoMap[compKey] = customComponentInfo;
                }
            } else if (Clazz && AbstractConvert.isPrototypeOf(Clazz)) {
                let convertInstance: AbstractConvert = new Clazz();
                let convertKey = convertInstance.getKey();
                this.abstractConvertMap[convertKey] = convertInstance;
            }
        });
    }

    //扫描项目操作实现（数据保存，加载操作 -> 本地 | 远程）
    public scannerProjectOperators(): void {
        const compCtx: any = import.meta.glob('../../framework/*/*.ts', {
            eager: true,
        });
        Object.keys(compCtx).forEach(key => {
            const Clazz = compCtx[key]?.default;
            if (Clazz && AbstractOperator.isPrototypeOf(Clazz)) {
                let operatorInstance: AbstractOperator = new Clazz();
                let operateEnv = operatorInstance.getKey();
                this.abstractOperatorMap[operateEnv] = operatorInstance;
            }
        });
    }

    /**
     * 初始化以更新方式打开时项目信息
     */
    private initExistProject(): void {
        let urlParams = URLUtil.parseUrlParams();
        const {doInit, setLoaded} = designerStore;
        this.abstractOperatorMap[SaveType.LOCAL].getProject(urlParams.id).then((res) => {
            const {status, data: store, msg} = res;
            if (status) {
                //初始化designerStore
                doInit({
                    id: store?.id,
                    canvasConfig: store?.canvasConfig,
                    projectConfig: store?.projectConfig,
                    elemConfigs: store?.elemConfigs,
                    layerConfigs: store?.layerConfigs,
                    statisticInfo: store?.statisticInfo,
                    themeConfig: store?.themeConfig,
                    extendParams: store?.extendParams,
                })
                //设置事件操作器的最大最小层级
                const {setMinLevel, setMaxLevel} = eventOperateStore;
                setMinLevel(store?.extendParams?.minLevel || 0);
                setMaxLevel(store?.extendParams?.maxLevel || 0);

                //初始化bpStore（蓝图状态） todo 是否可以以更规范的方式处理？
                const {setAPMap, setLines, setAPLineMap, setBpNodeConfigMap, setBpNodeControllerInsMap} = bpStore;
                setAPMap(store?.bpAPMap || {});
                setLines(store?.bpLines || {});
                setAPLineMap(store?.bpAPLineMap || {});
                setBpNodeConfigMap(store?.bpNodeConfigMap || {});
                //创建蓝图节点controller实例（这一点和编辑模式有区别，view模式下是不要渲染蓝图节点的，只需要蓝图节点controller实例）
                const bpNodeControllerInsMap: Record<string, AbstractBPNodeController> = {};
                Object.values(store?.bpNodeLayoutMap!).forEach(layout => {
                    const {type, id} = layout;
                    const NodeController = bpNodeControllerMap.get(type!) as ClazzTemplate<AbstractBPNodeController>;
                    const config = store?.bpNodeConfigMap![id!];
                    // @ts-ignore
                    bpNodeControllerInsMap[id!] = new NodeController!(config)!;
                })
                setBpNodeControllerInsMap(bpNodeControllerInsMap);
                //初始化蓝图左侧节点列表
                const {initUsedLayerNodes} = bpLeftStore;
                const usedLayerNodes: Record<string, boolean> = {};
                Object.keys(store?.bpNodeLayoutMap || {}).forEach(key => {
                    usedLayerNodes[key] = true;
                })
                initUsedLayerNodes(usedLayerNodes);
                setLoaded(true);
            } else {
                message.error(msg);
            }
        })
    }

}