import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";
import localforage from "localforage";
import {AbstractOperator} from "./AbstractOperator";
import {cloneDeep} from "lodash";
import IdGenerate from "../../utils/IdGenerate";
import ObjectUtil from "../../utils/ObjectUtil";

/**
 * 本地项目数据操作实现
 */
class LocalOperator extends AbstractOperator {
    public async createProject(project: IProjectInfo): Promise<string> {
        //生成项目id
        project.id = IdGenerate.generateId();
        const projectData = project.dataJson;
        let list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        project.dataJson = undefined;
        list.push(project);
        await localforage.setItem('light-chaser-project-list', list);
        await localforage.setItem(project.id, projectData);
        return Promise.resolve(project.id);
    }

    public async updateProject(project: IProjectInfo): Promise<boolean> {
        project = cloneDeep(project);
        const data = project.dataJson;
        delete project.dataJson;
        let list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        const index = list.findIndex((item: IProjectInfo) => item.id === project.id);
        if (index === -1) return false;
        const oldProject = list[index];
        project = ObjectUtil.merge(oldProject, project);
        list[index] = project;
        await localforage.setItem('light-chaser-project-list', list);
        if (data) await localforage.setItem(project.id!, data);
        return true;
    }

    public async deleteProject(id: string): Promise<boolean> {
        const list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        const index = list.findIndex((item: IProjectInfo) => item.id === id);
        if (index === -1) return false;
        list.splice(index, 1);
        await localforage.setItem('light-chaser-project-list', list);
        await localforage.removeItem(id);
        return true;
    }

    public async getProjectData(id: string): Promise<ProjectDataType | null> {
        const dataJson = await localforage.getItem(id);
        if (!dataJson) return null;
        return JSON.parse(dataJson as string);

    }

    public async getProjectInfoList(): Promise<IProjectInfo[]> {
        return await localforage.getItem('light-chaser-project-list') || [];
    }

    public async copyProject(id: string, name?: string): Promise<string> {
        const list: IProjectInfo[] = await localforage.getItem('light-chaser-project-list') || [];
        const index = list.findIndex((item: IProjectInfo) => item.id === id);
        if (index === -1) return '';
        const project = list[index];
        const newProject: IProjectInfo = cloneDeep(project);
        newProject.id = IdGenerate.generateId();
        newProject.name = name || newProject.name + '-副本';
        newProject.createTime = new Date().getTime() + '';
        newProject.updateTime = new Date().getTime() + '';
        list.push(newProject);
        await localforage.setItem('light-chaser-project-list', list);
        const dataJson = await localforage.getItem(id);
        if (dataJson)
            await localforage.setItem(newProject.id, dataJson);
        return newProject.id;
    }

}

export default LocalOperator;
