import {DesignerStore} from "../../designer/store/DesignerStore";

export abstract class AbstractOperator {

    public abstract getKey(): string;

    public abstract doCreateOrUpdate(designerStore: DesignerStore): Promise<void> ;

    public abstract deleteProject(id: number): boolean;

    public abstract getAllProject(): Promise<any[]>;

    public abstract getProjectSimpleInfoList(): Promise<any[]>;

    public abstract getProject(id: number): Promise<DesignerStore | null>;
}