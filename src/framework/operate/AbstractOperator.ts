import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";
import {IImageData} from "../../comps/lc/base-image/BaseImageComponent";

export abstract class AbstractOperator {
    /**
     * 创建项目
     * @param project 项目初始化数据
     */
    public abstract createProject(project: IProjectInfo): Promise<string>;

    /**
     * 更新项目数据
     * @param projectData 项目数据
     */
    public abstract updateProject(projectData: IProjectInfo): Promise<void> ;

    /**
     * 删除项目（在线项目为逻辑删除，本地项目为物理删除）
     * @param id 项目id
     */
    public abstract deleteProject(id: string): Promise<boolean>;

    /**
     * 获取项目列表
     */
    public abstract getProjectInfoList(): Promise<IProjectInfo[]>;

    /**
     * 获取项目完整数据，包括主设计器数据和蓝图设计器数据及每一个组件的详细配置
     * @param id 项目id
     */
    public abstract getProjectData(id: string): Promise<ProjectDataType | null>;

    /**
     * 复制项目
     * @param id 项目id
     */
    public abstract copyProject(id: string): Promise<string>;

    /**
     * 上传图片资源（仅用于设计器提供的标准图片组件）
     * @param file 图片文件
     */
    public abstract uploadImage(file: File): Promise<IImageData | boolean>;

    /**
     * 获取图片资源列表
     * @param projectId
     */
    public abstract getImageSourceList(projectId: string): Promise<IImageData[]>;
}