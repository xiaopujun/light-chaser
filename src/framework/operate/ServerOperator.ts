import {AbstractOperator} from "./AbstractOperator";
import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";

export default class ServerOperator extends AbstractOperator {
    async createProject(project: IProjectInfo): Promise<string> {
        const response = await fetch(`/api/project/create`, {
            method: 'post',
            body: JSON.stringify(project),
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    }

    async copyProject(id: string): Promise<string> {
        const response = await fetch(`/api/project/copy/${id}`, {method: 'get'});
        return await response.json();
    }

    async deleteProject(id: string): Promise<boolean> {
        const response = await fetch(`/api/project/del/${id}`, {method: 'get'});
        return await response.json();
    }

    async getProjectData(id: string): Promise<ProjectDataType | null> {
        const response = await fetch(`/api/project/getProjectData/${id}`, {method: 'get'});
        return await response.json();
    }

    public async getProjectInfoList(): Promise<IProjectInfo[]> {
        const response = await fetch('/api/project/list', {method: 'get'});
        return await response.json();
    }

    public async updateProject(data: IProjectInfo): Promise<boolean> {
        const response = await fetch('/api/project/update', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    }

}