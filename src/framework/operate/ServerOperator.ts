import {AbstractOperator} from "./AbstractOperator";
import {IProjectInfo, ProjectDataType, SaveType} from "../../designer/DesignerType";
import HttpUtil from "../../utils/HttpUtil";
import {INewProjectInfo} from "../../pages/home/project-list/AddNewProjectDialog";

export default class ServerOperator extends AbstractOperator {
    async createProject(project: INewProjectInfo): Promise<string> {
        const {name, des, saveType, width, height} = project;
        return await HttpUtil.sendHttpRequest('http://localhost:9000/api/project/create', 'post', {}, {
            name,
            des,
            saveType,
            dataJson: JSON.stringify({canvasConfig: {width, height}}),
        });
    }

    async copyProject(id: string): Promise<string> {
        const response = await fetch(`http://localhost:9000/api/project/copy/${id}`, {method: 'get'});
        return await response.json();
    }

    async deleteProject(id: string): Promise<boolean> {
        const response = await fetch(`http://localhost:9000/api/project/del/${id}`, {method: 'get'});
        return await response.json();
    }

    getKey(): string {
        return SaveType.SERVER;
    }

    async getProject(id: string): Promise<ProjectDataType> {
        const response = await fetch(`http://localhost:9000/api/project/get/${id}`, {method: 'get'});
        const projectInfo = await response.json();
        return JSON.parse(projectInfo.dataJson);
    }

    public async getProjectList(): Promise<any[]> {
        const response = await fetch('http://localhost:9000/api/project/list', {method: 'get'});
        return await response.json();
    }

    public async updateProject(data: IProjectInfo): Promise<boolean> {
        const response = await fetch('http://localhost:9000/api/project/update', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    }

}