import {action, makeObservable, observable} from "mobx";
import DesignerManager from "./DesignerManager.ts";
import {DesignerMode} from "../DesignerType.ts";
import serverOperator from "../../framework/operate/ServerOperator.ts";
import {globalMessage} from "../../framework/message/GlobalMessage.tsx";

class ViewDesignerManager extends DesignerManager {
    constructor() {
        super();
        makeObservable(this, {
            loaded: observable,
            setLoaded: action,
        })
    }

    public loaded: boolean = false;
    public setLoaded = (loaded: boolean) => this.loaded = loaded;

    load = (id: string): void => {
        //扫描组件
        this.scanComponents();
        //扫描蓝图
        this.scanBPController();
        //加载数据
        serverOperator.getProjectData(id).then((data) => {
            if (data) {
                this.init(data, DesignerMode.VIEW);
                this.setLoaded(true);
            } else {
                globalMessage?.messageApi?.error("项目不存在");
            }
        })
    }

}

const viewDesignerManager = new ViewDesignerManager();
export default viewDesignerManager;