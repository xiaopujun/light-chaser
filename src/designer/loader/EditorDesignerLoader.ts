import designerStore from "../store/DesignerStore";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import bpStore from "../../blueprint/store/BPStore";
import bpLeftStore from "../../blueprint/left/BPLeftStore";
import URLUtil from "../../utils/URLUtil";
import {message} from "antd";
import operatorMap from "../../framework/operate";
import {SaveType} from "../DesignerType";

class EditorDesignerLoader extends AbstractDesignerLoader {

    protected scanComponents(): void {
        this.scannerCustomComponents();
    }

    /**
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
                message.error("项目不存在");
            }
        })
    }
}

const editorDesignerLoader = new EditorDesignerLoader();
export default editorDesignerLoader;