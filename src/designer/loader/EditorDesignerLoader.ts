import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import operatorMap from "../../framework/operate";
import {DesignerMode, SaveType} from "../DesignerType";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import designerManager from "../manager/DesignerManager.ts";

class EditorDesignerLoader extends AbstractDesignerLoader {

    /**
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string, type: SaveType): void {
        operatorMap[type].getProjectData(id).then((data) => {
            if (data) {
                designerManager.init(data, DesignerMode.EDIT);
                designerManager.setLoaded(true);
            } else {
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }
}

const editorDesignerLoader = new EditorDesignerLoader();
export default editorDesignerLoader;