import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";

export interface IImageData {
    id?: string;
    url: string;
}

export abstract class AbstractOperator {

    public abstract createProject(project: IProjectInfo): Promise<string>;

    public abstract updateProject(projectData: IProjectInfo): Promise<boolean> ;

    public abstract deleteProject(id: string): Promise<boolean>;

    public abstract getProjectInfoList(): Promise<IProjectInfo[]>;

    public abstract getProjectData(id: string): Promise<ProjectDataType | null>;

    public abstract copyProject(id: string): Promise<string>;

    public abstract uploadImage(file: File): Promise<IImageData>;
}