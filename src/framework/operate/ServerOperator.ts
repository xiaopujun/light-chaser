import {AbstractOperator} from "./AbstractOperator";
import {IProjectInfo, ProjectDataType} from "../../designer/DesignerType";
import URLUtil from "../../utils/URLUtil";
import {globalMessage} from "../message/GlobalMessage";
import {IImageData} from "../../comps/lc/base-image/BaseImageComponent";

export default class ServerOperator extends AbstractOperator {

    async createProject(project: IProjectInfo): Promise<string> {
        const response = await fetch(`/api/project/create`, {
            method: 'post',
            body: JSON.stringify(project),
            headers: {'Content-Type': 'application/json'}
        });
        const res = await response.json();
        return res.code === 200 ? res.data : '';
    }

    async copyProject(id: string): Promise<string> {
        const response = await fetch(`/api/project/copy/${id}`, {method: 'get'});
        const res = await response.json();
        return res.code === 200 ? res.data : '';
    }

    async deleteProject(id: string): Promise<boolean> {
        const response = await fetch(`/api/project/del/${id}`, {method: 'get'});
        const res = await response.json();
        return res.code === 200;
    }

    async getProjectData(id: string): Promise<ProjectDataType | null> {
        const response = await fetch(`/api/project/getProjectData/${id}`, {method: 'get'});
        const res = await response.json();
        if (res.code === 200)
            return JSON.parse(res.data);
        else {
            globalMessage.messageApi?.error(res.msg);
            return null;
        }
    }

    public async getProjectInfoList(): Promise<IProjectInfo[]> {
        const response = await fetch('/api/project/list', {method: 'get'});
        const res = await response.json();
        if (res.code === 200)
            return res.data;
        else {
            globalMessage.messageApi?.error(res.msg);
            return [];
        }
    }

    public async updateProject(data: IProjectInfo): Promise<void> {
        const response = await fetch('/api/project/update', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        const res = await response.json();
        if (res.code === 200)
            globalMessage.messageApi?.success('保存成功');
        else
            globalMessage.messageApi?.error(res.msg);
    }

    public async uploadImage(file: File): Promise<IImageData | boolean> {
        const {id} = URLUtil.parseUrlParams();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', id);
        formData.append('type', "1");
        const response = await fetch(`/api/file/upload`, {
            method: 'post',
            body: formData,
        });
        const res = await response.json();
        return res.code === 200 ? {url: res.data} : false;
    }

    async getImageSourceList(projectId: string): Promise<IImageData[]> {
        const response = await fetch(`/api/file/getList/${projectId}`, {method: 'get'});
        const res = await response.json();
        if (res.code === 200)
            return res.data;
        else {
            globalMessage.messageApi?.error(res.msg);
            return [];
        }
    }

    public async delImageSource(imageId: string): Promise<boolean> {
        const response = await fetch(`/api/file/del/${imageId}`, {method: 'get'});
        const res = await response.json();
        if (res.code === 200) return true
        else {
            globalMessage.messageApi?.error(res.msg);
            return false;
        }
    }

    public async uploadCover(file: File): Promise<boolean> {
        const {id} = URLUtil.parseUrlParams();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);
        const response = await fetch(`/api/project/cover`, {
            method: 'post',
            body: formData,
        });
        const res = await response.json();
        return res.code === 200;
    }
}