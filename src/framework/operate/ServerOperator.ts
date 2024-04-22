import {AbstractOperator} from "./AbstractOperator";
import {IPage, IPageParam, IProjectInfo, ProjectDataType} from "../../designer/DesignerType";
import URLUtil from "../../utils/URLUtil";
import {globalMessage} from "../message/GlobalMessage";
import {IImageData} from "../../comps/lc/base-image/BaseImageComponent";
import FetchUtil from "../../utils/FetchUtil.ts";

export default class ServerOperator extends AbstractOperator {

    async createProject(project: IProjectInfo): Promise<string> {
        const res = await FetchUtil.post('/api/project/create', project);
        return res.code === 200 ? res.data : '';
    }

    async copyProject(id: string): Promise<string> {
        const res = await FetchUtil.get(`/api/project/copy/${id}`);
        return res.code === 200 ? res.data : '';
    }

    async deleteProject(id: string): Promise<boolean> {
        const res = await FetchUtil.get(`/api/project/del/${id}`);
        return res.code === 200;
    }

    async getProjectData(id: string): Promise<ProjectDataType | null> {
        const res = await FetchUtil.get(`/api/project/getProjectData/${id}`);
        if (res.code === 200)
            return JSON.parse(res.data);
        else {
            globalMessage.messageApi?.error(res.msg);
            return null;
        }
    }

    /**
     * 获取项目分页列表
     */
    public async getProjectInfoPageList(pageParam: IPageParam): Promise<IPage<IProjectInfo>> {
        const res = await FetchUtil.post('/api/project/pageList', pageParam);
        if (res.code === 200)
            return res.data;
        else {
            if (res.code === 500)
                res.msg = "服务器链接失败";
            globalMessage.messageApi?.error(res.msg);
            return {records: [], total: 0, current: 1, size: 10};
        }
    }

    public async updateProject(data: IProjectInfo): Promise<void> {
        const res = await FetchUtil.post('/api/project/update', data);
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

        const res = await FetchUtil.post('/api/file/upload', formData);
        return res.code === 200 ? {url: res.data} : false;
    }

    async getImageSourceList(projectId: string): Promise<IImageData[]> {
        const res = await FetchUtil.get(`/api/file/getList/${projectId}`);
        if (res.code === 200)
            return res.data;
        else {
            globalMessage.messageApi?.error(res.msg);
            return [];
        }
    }

    public async delImageSource(imageId: string): Promise<boolean> {
        const res = await FetchUtil.get(`/api/file/del/${imageId}`);
        if (res.code === 200) return true;
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

        const res = await FetchUtil.post('/api/project/cover', formData);
        return res.code === 200;
    }
}