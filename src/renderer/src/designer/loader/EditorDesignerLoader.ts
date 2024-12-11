import designerManager from "../manager/DesignerManager.ts";
import operatorMap from "../../framework/operate";
import {DesignerMode, ProjectDataType, SaveType} from "../DesignerType";
import {AbstractDesignerLoader} from "./AbstractDesignerLoader";
import layerManager from "../manager/LayerManager.ts";
import BPExecutor from "../blueprint/core/BPExecutor.ts";

class EditorDesignerLoader extends AbstractDesignerLoader {

    protected async getProjectData(id: string, type: SaveType): Promise<ProjectDataType | null> {
        return await operatorMap[type].getProjectData(id);
    }

    protected getProjectDataAfter(id: string, type: SaveType, data: ProjectDataType): void {
        designerManager.init(data, DesignerMode.EDIT);
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

const editorDesignerLoader = new EditorDesignerLoader();
export default editorDesignerLoader;