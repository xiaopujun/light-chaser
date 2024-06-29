import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode, SaveType} from "../DesignerType";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import DesignerManager from "../manager/DesignerManager.ts";
import serverOperator from "../../framework/operate/ServerOperator.ts";

const designerManager = new DesignerManager();
const layerManager = designerManager.layerManager;
const themeManager = designerManager.themeManager;
const canvasManager = designerManager.canvasManager;
const bluePrintManager = designerManager.bluePrintManager;
const filterManager = designerManager.filterManager;
const bpExecutor = designerManager.bpExecutor;
export {designerManager, layerManager, themeManager, canvasManager, bluePrintManager, filterManager, bpExecutor};

class EditorDesignerLoader extends AbstractDesignerLoader {

    /**
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string, type: SaveType): void {
        const {init, setLoaded} = designerManager;
        serverOperator.getProjectData(id).then((data) => {
            if (data) {
                init(data, DesignerMode.EDIT);
                setLoaded(true);
            } else {
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }
}

const editorDesignerLoader = new EditorDesignerLoader();
export default editorDesignerLoader;