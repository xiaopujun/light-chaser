import {AbstractOperator, OperateResult} from "./AbstractOperator";
import {IProjectInfo, ProjectDataType, SaveType} from "../../designer/DesignerType";
import HttpUtil from "../../utils/HttpUtil";

export default class ServerOperator extends AbstractOperator {
    async createProject(project: IProjectInfo): Promise<string> {
        return await HttpUtil.sendHttpRequest('http://localhost:9000/api/project/create', 'post', {}, {
            name: project.name,
            des: project.des,
            saveType: project.saveType,
        });
    }

    copyProject(id: string, name?: string): Promise<OperateResult<string>> {
        return Promise.resolve({});
    }

    deleteProject(id: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    getKey(): string {
        return SaveType.SERVER;
    }

    getProject(id: string): Promise<OperateResult<ProjectDataType>> {
        return Promise.resolve({});
    }

    getProjectList(): Promise<any[]> {
        return Promise.resolve([]);
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