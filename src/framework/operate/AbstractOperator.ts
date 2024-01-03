import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";

export interface IImageData {
    hash?: string;
    name?: string;
    blob?: Blob;
    url: string;
}

export abstract class AbstractOperator {

    public abstract createProject(project: IProjectInfo): Promise<string>;

    public abstract updateProject(projectData: IProjectInfo): Promise<void> ;

    public abstract deleteProject(id: string): Promise<boolean>;

    public abstract getProjectInfoList(): Promise<IProjectInfo[]>;

    public abstract getProjectData(id: string): Promise<ProjectDataType | null>;

    public abstract copyProject(id: string): Promise<string>;

    public abstract uploadImage(file: File): Promise<IImageData | boolean>;

    public abstract getImageSourceList(projectId: string): Promise<any[]>;
}