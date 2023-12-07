import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";

export interface OperateResult<T = any> {
    status?: boolean;
    msg?: string;
    data?: T;
}

export abstract class AbstractOperator {

    public abstract createProject(project: IProjectInfo): Promise<string>;

    public abstract updateProject(projectData: IProjectInfo): Promise<boolean> ;

    public abstract deleteProject(id: string): Promise<boolean>;

    public abstract getProjectList(): Promise<any[]>;

    public abstract getProject(id: string): Promise<ProjectDataType>;

    public abstract copyProject(id: string): Promise<string>;
}