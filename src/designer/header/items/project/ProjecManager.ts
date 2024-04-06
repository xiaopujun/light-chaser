import {action, makeObservable, observable, toJS} from "mobx";
import AbstractManager from "../../../manager/core/AbstractManager.ts";
import {IProjectInfo, ProjectState, SaveType} from "../../../DesignerType.ts";

class ProjecManager extends AbstractManager<IProjectInfo> {
    constructor() {
        super();
        makeObservable(this, {
            projectVisible: observable,
            setProjectVisible: action,
            projectConfig: observable,
            updateProjectConfig: action,
        })
    }

    projectVisible: boolean = false;

    setProjectVisible = (visible: boolean) => this.projectVisible = visible;

    /**
     * 项目设置
     */
    projectConfig: IProjectInfo = {
        name: "", //项目名称
        des: "", //项目描述
        state: ProjectState.DRAFT, //项目状态
        createTime: "", //创建时间
        updateTime: "", //更新时间
        saveType: SaveType.LOCAL, //存储类型
    };

    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: IProjectInfo) => this.projectConfig = {...this.projectConfig, ...data};

    destroy(): void {
    }

    getData(): IProjectInfo {
        return toJS(this.projectConfig);
    }

    init(data: IProjectInfo): void {
    }


}

const projectHdStore = new ProjecManager();
export default projectHdStore;