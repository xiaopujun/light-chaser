import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode} from "../DesignerType";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";
import serverOperator from "../../framework/operate/ServerOperator.ts";
import {viewDesignerManager} from "./ViewDesignerManager.ts";


/**
 * 展示模式下的设计器加载器
 */
class ViewDesignerLoader extends AbstractDesignerLoader {

    /**
     * todo 使用模板方法模式细化初始化过程，达到代码结构的复用
     * 初始化以更新方式打开时项目信息
     */
    protected initProject(id: string): void {
        const {init, setLoaded} = viewDesignerManager;
        serverOperator.getProjectData(id).then((data) => {
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

