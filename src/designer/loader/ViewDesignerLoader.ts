import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import designerStore from "../store/DesignerStore";
import {DesignerMode, SaveType} from "../DesignerType";
import bpStore from "../../designer/blueprint/store/BPStore";
import operatorMap from "../../framework/operate";
import {AbstractOperator} from "../../framework/operate/AbstractOperator";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import designerManager from "../manager/DesignerManager.ts";

/**
 * 展示模式下的设计器加载器
 */
class ViewDesignerLoader extends AbstractDesignerLoader {

    /**
     * todo 使用模板方法模式细化初始化过程，达到代码结构的复用
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string, type: SaveType): void {
        (operatorMap[type] as AbstractOperator).getProjectData(id).then((data) => {
            if (data) {
                const {doInit} = designerStore;
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
                }, DesignerMode.VIEW)

                designerManager.setLoaded(true);
            } else {
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }

}

const viewDesignerLoader = new ViewDesignerLoader();
export default viewDesignerLoader;