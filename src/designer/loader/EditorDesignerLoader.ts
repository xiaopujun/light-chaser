import designerStore from "../store/DesignerStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {AbstractHeaderItem, HeaderItemProps} from "../header/HeaderTypes";
import {AbstractDefinition} from "../../framework/core/AbstractDefinition";
import AbstractConvert from "../../framework/convert/AbstractConvert";
import bpStore from "../../blueprint/store/BPStore";
import bpLeftStore from "../../blueprint/left/BPLeftStore";
import URLUtil from "../../utils/URLUtil";
import {message} from "antd";
import operatorMap from "../../framework/operate";
import {SaveType} from "../DesignerType";

export default class EditorDesignerLoader extends AbstractDesignerLoader {

    private static instance: EditorDesignerLoader | null = null;

    public static getInstance(): EditorDesignerLoader {
        if (!this.instance)
            this.instance = new EditorDesignerLoader();
        return this.instance;
    }

    protected scanComponents(): void {
        this.scannerHeader();
        this.scannerCustomComponents();
        // this.scannerProjectOperators();
    }

    protected loadProjectData(): void {
        this.initProject();
    }

    //扫描头部组件
    private scannerHeader(): void {
        const headerCtx: any = import.meta.glob(['/src/designer/header/items/*/*.tsx', '/src/designer/header/items/*/*.ts'], {
            eager: true,
        });
        let tempHeaderItemInstances: HeaderItemProps[] = [];
        Object.keys(headerCtx).forEach(key => {
            const HeaderClazz = headerCtx[key]?.default;
            if (HeaderClazz && AbstractHeaderItem.isPrototypeOf(HeaderClazz)) {
                let headerItemIns = new HeaderClazz();
                tempHeaderItemInstances.push(headerItemIns.getHeaderItemInfo());
            }
        });
        this.headerItemInstances = tempHeaderItemInstances.sort((a, b) => {
            const aOrder = a.order || 0, bOrder = b.order || 0;
            return aOrder - bOrder
        });
    }

    //扫描自定义组件
    private scannerCustomComponents(): void {
        const compCtx: any = import.meta.glob('../../comps/**/*Definition.ts', {
            eager: true,
        });
        Object.keys(compCtx).forEach(key => {
            const Clazz = compCtx[key]?.default;
            if (Clazz && AbstractDefinition.isPrototypeOf(Clazz)) {
                let definition: AbstractDefinition = new Clazz();
                if (typeof definition.getBaseInfo === "function") {
                    let compKey = definition.getBaseInfo().compKey;
                    if (compKey)
                        this.definitionMap[compKey] = definition;
                }
            } else if (Clazz && AbstractConvert.isPrototypeOf(Clazz)) {
                let convert: AbstractConvert = new Clazz();
                let convertKey = convert.getKey();
                this.convertMap[convertKey] = convert;
            }
        });
    }

    /**
     * 初始化以更新方式打开时项目信息
     */
    private initProject(): void {
        let urlParams = URLUtil.parseUrlParams();
        const {saveType, id} = urlParams;
        const {doInit, setLoaded} = designerStore;
        operatorMap[saveType as SaveType].getProject(id).then((data) => {
            if (data) {
                //初始化designerStore
                doInit({
                    id: id,
                    canvasConfig: data?.canvasConfig || {},
                    // projectConfig: data?.projectConfig || {},
                    elemConfigs: data?.elemConfigs || {},
                    layerConfigs: data?.layerConfigs || {},
                    statisticInfo: data?.statisticInfo || {},
                    themeConfig: data?.themeConfig || [],
                    extendParams: data?.extendParams || {},
                })
                //设置事件操作器的最大最小层级
                const {setMinLevel, setMaxLevel} = eventOperateStore;
                setMinLevel(data?.extendParams?.minLevel || 0);
                setMaxLevel(data?.extendParams?.maxLevel || 0);

                //初始化bpStore（蓝图状态） todo 是否可以以更规范的方式处理？
                const {setAPMap, setLines, setAPLineMap, setBpNodeLayoutMap, setBpNodeConfigMap} = bpStore;
                setAPMap(data?.bpAPMap || {});
                setLines(data?.bpLines || {});
                setAPLineMap(data?.bpAPLineMap || {});
                setBpNodeLayoutMap(data?.bpNodeLayoutMap || {});
                setBpNodeConfigMap(data?.bpNodeConfigMap || {});
                //初始化蓝图左侧节点列表
                const {initUsedLayerNodes} = bpLeftStore;
                const usedLayerNodes: Record<string, boolean> = {};
                Object.keys(data?.bpNodeLayoutMap || {}).forEach(key => {
                    usedLayerNodes[key] = true;
                })
                initUsedLayerNodes(usedLayerNodes);
                setLoaded(true);
            } else {
                message.error('项目不存在');
            }
        })
    }
}