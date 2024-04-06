import AbstractManager from "./core/AbstractManager.ts";
import {action, makeObservable, observable} from "mobx";
import {ProjectDataType} from "../DesignerType.ts";

/**
 * 整个设计器的所有数据初始化和数据聚合，统一通过该管理器进行分发和处理
 */
class DesignerManager extends AbstractManager<ProjectDataType> {
    constructor() {
        super();
        makeObservable(this, {
            loaded: observable,
            setLoaded: action,
        })
    }

    /**
     * 大屏id
     */
    id: string = "";

    loaded: boolean = false;

    setLoaded = (loaded: boolean) => this.loaded = loaded;

    destroy(): void {
    }

    getData(): any {
    }

    init(data: ProjectDataType): void {
        this.id = data.id ?? this.id;
    }

}

const designerManager = new DesignerManager();
export default designerManager;