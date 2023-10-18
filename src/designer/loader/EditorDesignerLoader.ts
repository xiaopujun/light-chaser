import designerStore from "../store/DesignerStore";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {parseUrlParams} from "../../utils/URLUtil";
import {ProjectDataType, SaveType} from "../DesignerType";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {AbstractHeaderItem, HeaderItemProps} from "../header/HeaderTypes";
import {AbstractComponentDefinition} from "../../framework/core/AbstractComponentDefinition";
import {AbstractOperator} from "../../framework/operate/AbstractOperator";
import AbstractConvert from "../../framework/convert/AbstractConvert";
import bpStore from "../../blueprint/store/BPStore";

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
        this.scannerProjectOperators();
    }

    protected loadProjectData(): void {
        let urlParams = parseUrlParams();
        const {action} = urlParams;
        if (['edit', 'view'].includes(action))
            this.initExistProject();
        else if (action === 'create')
            this.initNewProject();
        else
            throw new Error('action is error')
    }

    //扫描头部组件
    private scannerHeader(): void {
        const headerCtx = require.context('../header/items', true, /\.(tsx|ts)$/);
        let tempHeaderItemInstances: HeaderItemProps[] = [];
        headerCtx.keys().forEach(key => {
            const HeaderClazz = headerCtx(key).default;
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
        const compCtx = require.context('../../comps', true, /\.(ts)$/);
        compCtx.keys().forEach(key => {
            const Clazz = compCtx(key).default;
            if (Clazz && AbstractComponentDefinition.isPrototypeOf(Clazz)) {
                let customComponentInfo: AbstractComponentDefinition = new Clazz();
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
        const compCtx = require.context('../../framework', true, /\.(ts)$/);
        compCtx.keys().forEach(key => {
            const Clazz = compCtx(key).default;
            if (Clazz && AbstractOperator.isPrototypeOf(Clazz)) {
                let operatorInstance: AbstractOperator = new Clazz();
                let operateEnv = operatorInstance.getKey();
                this.abstractOperatorMap[operateEnv] = operatorInstance;
            }
        });
    }

    /**
     * 初始化以创建方式打开时项目信息
     */
    private initNewProject(): void {
        let urlParams = parseUrlParams();
        const {width, height, name} = urlParams;
        const {doInit} = designerStore;
        doInit({
            canvasConfig: {
                width: parseInt(width),
                height: parseInt(height),
            },
            projectConfig: {
                name: name
            },
        })
        const {setLoaded} = designerStore;
        setLoaded(true);
    }

    /**
     * 初始化以更新方式打开时项目信息
     */
    private initExistProject(): void {
        let urlParams = parseUrlParams();
        const {doInit, setLoaded} = designerStore;
        this.abstractOperatorMap[SaveType.LOCAL].getProject(urlParams.id).then((store: ProjectDataType | null) => {
            if (store) {
                //初始化designerStore
                doInit({
                    id: store.id,
                    canvasConfig: store.canvasConfig,
                    projectConfig: store.projectConfig,
                    elemConfigs: store.elemConfigs,
                    layoutConfigs: store.layoutConfigs,
                    statisticInfo: store.statisticInfo,
                    themeConfig: store.themeConfig,
                    extendParams: store.extendParams,
                })
                //设置事件操作器的最大最小层级
                const {setMinLevel, setMaxLevel} = eventOperateStore;
                setMinLevel(store.extendParams?.minLevel || 0);
                setMaxLevel(store.extendParams?.maxLevel || 0);
                //初始化bpStore（蓝图状态） todo 是否可以以更规范的方式处理？
                const {setNodes, setAPMap, setLines} = bpStore;
                setNodes(store.bpNodes || {});
                setAPMap(store.bpAPMap || {});
                setLines(store.bpLines || {});
            }
            setLoaded(true);
        })
    }
}