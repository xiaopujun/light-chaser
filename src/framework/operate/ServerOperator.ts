import {AbstractOperator, IImageData} from "./AbstractOperator";
import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";
import URLUtil from "../../utils/URLUtil";

export default class ServerOperator extends AbstractOperator {
    public async uploadImage(file: File): Promise<IImageData> {
        const {id} = URLUtil.parseUrlParams();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', id);
        const response = await fetch(`/api/file/image/upload`, {
            method: 'post',
            body: formData,
        });
        return await response.json();
    }

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