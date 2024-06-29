import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode} from "../DesignerType";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import serverOperator from "../../framework/operate/ServerOperator.ts";
import {editDesignerManager} from "./EditDesignerManager.ts";


class EditorDesignerLoader extends AbstractDesignerLoader {

    /**
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string): void {
        const {init, setLoaded} = editDesignerManager;
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