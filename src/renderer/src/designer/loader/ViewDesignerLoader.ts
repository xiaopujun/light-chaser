import designerManager from "../manager/DesignerManager.ts";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import {DesignerMode, ProjectDataType, SaveType} from "../DesignerType";
import operatorMap from "../../framework/operate";
import layerManager from "../manager/LayerManager.ts";
import BPExecutor from "../blueprint/core/BPExecutor.ts";


/**
 * 展示模式下的设计器加载器
 */
class ViewDesignerLoader extends AbstractDesignerLoader {

    protected async getProjectData(id: string, type: SaveType): Promise<ProjectDataType | null> {
        return await operatorMap[type].getProjectData(id);
    }

    protected getProjectDataAfter(id: string, type: SaveType, data: ProjectDataType): void {
        designerManager.init(data, DesignerMode.VIEW);
        window.LC_ENV = {
            projectId: id,
            saveType: type,
            mode: DesignerMode.EDIT,
            createdController: 0,
            totalController: Object.keys(data.layerManager?.layerConfigs ?? []).length,
            controllers: layerManager.compController,
            definitions: this.definitionMap,
            bpExecutor: BPExecutor,
            layerManager: layerManager,
            ...window.LC_ENV
        }
    }
}

const viewDesignerLoader = new ViewDesignerLoader();
export default viewDesignerLoader;