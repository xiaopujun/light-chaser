import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode, SaveType} from "../DesignerType";
import operatorMap from "../../framework/operate";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import DesignerManager from "../manager/DesignerManager.ts";


/**
 * 展示模式下的设计器加载器
 */
class ViewDesignerLoader extends AbstractDesignerLoader {

    /**
     * todo 使用模板方法模式细化初始化过程，达到代码结构的复用
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string, type: SaveType): void {
        const {init, setLoaded} = viewDesignerManager;
        operatorMap[type].getProjectData(id).then((data) => {
            if (data) {
                init(data, DesignerMode.VIEW);
                setLoaded(true);
            } else {
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }

}

const viewDesignerLoader = new ViewDesignerLoader();
export default viewDesignerLoader;

const viewDesignerManager = new DesignerManager();
const viewLayerManager = viewDesignerManager.layerManager;
const viewCanvasManager = viewDesignerManager.canvasManager;
const viewBpExecutor = viewDesignerManager.bpExecutor;
export {viewDesignerManager, viewLayerManager, viewCanvasManager, viewBpExecutor};