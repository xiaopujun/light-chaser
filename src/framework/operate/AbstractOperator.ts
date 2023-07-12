import {ProjectDataType} from "../../designer/DesignerType";

export abstract class AbstractOperator {

    public abstract getKey(): string;

    public abstract doCreateOrUpdate(projectData: ProjectDataType): Promise<void> ;

    public abstract deleteProject(id: string): boolean;

    public abstract getProjectSimpleInfoList(): Promise<any[]>;

    public abstract getProject(id: string): Promise<ProjectDataType | null>;
}