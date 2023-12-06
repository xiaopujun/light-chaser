import {ProjectDataType} from "../../designer/DesignerType";
import {INewProjectInfo} from "../../pages/home/project-list/AddNewProjectDialog";

export interface OperateResult<T = any> {
    status?: boolean;
    msg?: string;
    data?: T;
}

export abstract class AbstractOperator {

    public abstract getKey(): string;

    public abstract createProject(project: INewProjectInfo): Promise<string>;

    public abstract saveProject(projectData: ProjectDataType): Promise<OperateResult> ;

    public abstract deleteProject(id: string): Promise<boolean>;

    public abstract getProjectList(): Promise<any[]>;

    public abstract getProject(id: string): Promise<OperateResult<ProjectDataType>>;

    public abstract copyProject(id: string): Promise<OperateResult<string>>;
}