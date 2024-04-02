import designerStore from "../store/DesignerStore";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import bpStore from "../../blueprint/store/BPStore";
import bpLeftStore from "../../blueprint/left/BPLeftStore";
import operatorMap from "../../framework/operate";
import {SaveType} from "../DesignerType";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";

class EditorDesignerLoader extends AbstractDesignerLoader {

    protected scanComponents(): void {
        this.scannerCustomComponents();
    }

    /**
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string, type: SaveType): void {
        operatorMap[type].getProjectData(id).then((data) => {
            if (data) {
                const {doInit, setLoaded} = designerStore;
                //初始化designerStore
                doInit({
                    id: id,
                    canvasConfig: data?.canvasConfig,
                    elemConfigs: data?.elemConfigs,
                    layerConfigs: data?.layerConfigs,
                    themeConfig: data?.themeConfig,
                    layerHeader: data?.layerHeader,
                    layerTail: data?.layerTail,
                })

                //初始化bpStore（蓝图状态）
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
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }
}

const editorDesignerLoader = new EditorDesignerLoader();
export default editorDesignerLoader;