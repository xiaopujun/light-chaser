import {AbstractOperator, OperateResult} from "./AbstractOperator";
import {ProjectDataType, SaveType} from "../../designer/DesignerType";
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

    async copyProject(id: string): Promise<OperateResult<string>> {
        const response = await fetch(`http://localhost:9000/api/project/copy/${id}`, {
            method: 'get',
        });
        return await response.json();
    }

    async deleteProject(id: string): Promise<boolean> {
        const response = await fetch(`http://localhost:9000/api/project/del/${id}`, {
            method: 'get',
        });
        return await response.json();
    }

    getKey(): string {
        return SaveType.SERVER;
    }

    getProject(id: string): Promise<OperateResult<ProjectDataType>> {
        return Promise.resolve({});
    }

    async getProjectList(): Promise<any[]> {
        const response = await fetch('http://localhost:9000/api/project/list', {
            method: 'get',
        });
        return await response.json();
    }

    public async saveProject(data: ProjectDataType): Promise<OperateResult> {
        const response = (await fetch('http://localhost:9000/project/createOrUpdate', {
            method: 'post',
            body: JSON.stringify({
                name: 'test',
                des: 'test description',
                saveType: 1,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }));
        const res = await response.json();
        return {status: true, msg: '创建成功', data: res};
    }

}