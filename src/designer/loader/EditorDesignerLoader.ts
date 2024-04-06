import designerStore from "../store/DesignerStore";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import bpStore from "../../designer/blueprint/store/BPStore";
import operatorMap from "../../framework/operate";
import {DesignerMode, SaveType} from "../DesignerType";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import canvasManager from "../header/items/canvas/CanvasManager.ts";

class EditorDesignerLoader extends AbstractDesignerLoader {

    /**
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string, type: SaveType): void {
        operatorMap[type].getProjectData(id).then((data) => {
            if (data) {
                const {doInit, setLoaded} = designerStore;
                canvasManager.init(data?.canvasConfig!)
                //初始化designerStore
                doInit({
                    id: id,
                    // canvasConfig: data?.canvasConfig,
                    elemConfigs: data?.elemConfigs,
                    layerConfigs: data?.layerConfigs,
                    themeConfig: data?.themeConfig,
                    layerHeader: data?.layerHeader,
                    layerTail: data?.layerTail,
                })

                //初始化bpStore（蓝图状态）
                const {doBPInit} = bpStore;
                doBPInit({
                    bpAPMap: data?.bpAPMap,
                    bpLines: data?.bpLines,
                    bpAPLineMap: data?.bpAPLineMap,
                    bpNodeLayoutMap: data?.bpNodeLayoutMap,
                    bpNodeConfigMap: data?.bpNodeConfigMap,
                }, DesignerMode.EDIT)

                setLoaded(true);
            } else {
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }
}

const editorDesignerLoader = new EditorDesignerLoader();
export default editorDesignerLoader;