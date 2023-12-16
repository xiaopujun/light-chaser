import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
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
import operatorMap from "../../framework/operate";

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
    }

    /**
     * todo 使用模板方法模式细化初始化过程，达到代码结构的复用
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(): void {
        const {saveType, id} = URLUtil.parseUrlParams();
        operatorMap[saveType as SaveType].getProjectData(id).then((data) => {
            if (data) {
                const {doInit, setLoaded} = designerStore;
                //初始化designerStore
                doInit({
                    id: id,
                    canvasConfig: data?.canvasConfig,
                    elemConfigs: data?.elemConfigs,
                    layerConfigs: data?.layerConfigs,
                    statisticInfo: data?.statisticInfo,
                    themeConfig: data?.themeConfig,
                    extendParams: data?.extendParams,
                })
                //设置事件操作器的最大最小层级
                const {setMinLevel, setMaxLevel} = eventOperateStore;
                setMinLevel(data?.extendParams?.minLevel || 0);
                setMaxLevel(data?.extendParams?.maxLevel || 0);

                //初始化bpStore（蓝图状态） todo 是否可以以更规范的方式处理？
                const {setAPMap, setLines, setAPLineMap, setBpNodeConfigMap, setBpNodeControllerInsMap} = bpStore;
                setAPMap(data?.bpAPMap || {});
                setLines(data?.bpLines || {});
                setAPLineMap(data?.bpAPLineMap || {});
                setBpNodeConfigMap(data?.bpNodeConfigMap || {});
                //创建蓝图节点controller实例（这一点和编辑模式有区别，view模式下是不要渲染蓝图节点的，只需要蓝图节点controller实例）
                const bpNodeControllerInsMap: Record<string, AbstractBPNodeController> = {};
                Object.values(data?.bpNodeLayoutMap!).forEach((layout: any) => {
                    const {type, id} = layout;
                    const NodeController = bpNodeControllerMap.get(type!) as ClazzTemplate<AbstractBPNodeController>;
                    const config = data?.bpNodeConfigMap![id!];
                    // @ts-ignore
                    bpNodeControllerInsMap[id!] = new NodeController!(config)!;
                })
                setBpNodeControllerInsMap(bpNodeControllerInsMap);
                //初始化蓝图左侧节点列表
                const {initUsedLayerNodes} = bpLeftStore;
                const usedLayerNodes: Record<string, boolean> = {};
                Object.keys(data?.bpNodeLayoutMap || {}).forEach(key => {
                    usedLayerNodes[key] = true;
                })
                initUsedLayerNodes(usedLayerNodes);
                setLoaded(true);
            } else {
                message.error("项目不存在");
            }
        })
    }

}