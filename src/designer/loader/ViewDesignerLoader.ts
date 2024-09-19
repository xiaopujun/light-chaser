import designerManager from "../manager/DesignerManager.ts";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode, SaveType} from "../DesignerType";
import operatorMap from "../../framework/operate";
import {AbstractOperator} from "../../framework/operate/AbstractOperator";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";


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
                designerManager.init(data, DesignerMode.VIEW);
                designerManager.setLoaded(true);
                window.LC_ENV = {
                    createdController: 0,
                    totalController: Object.keys(data.layerManager?.layerConfigs ?? []).length
                }
            } else {
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }

}

const viewDesignerLoader = new ViewDesignerLoader();
export default viewDesignerLoader;