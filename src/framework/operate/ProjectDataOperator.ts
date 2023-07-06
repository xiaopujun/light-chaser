import {DesignerStore} from "../../designer/store/DesignerStore";

export default interface ProjectDataOperator {
    /**
     * 创建项目
     * @param data 项目数据
     */
    createProject(data: DesignerStore): Promise<string>;

    /**
     * 更新项目
     * @param data
     */
    updateProject(data: DesignerStore): Promise<boolean>;

    /**
     * 删除项目
     */
    deleteProject(id: number): boolean;

    /**
     * 获取所有项目
     */
    getAllProject(): Promise<any[]>;

    /**
     * 获取项目简单信息列表（用于列表展示)
     */
    getProjectSimpleInfoList(): Promise<any[]>;

    /**
     * 获取项目
     */
    getProject(id: number): Promise<DesignerStore | null>;
}