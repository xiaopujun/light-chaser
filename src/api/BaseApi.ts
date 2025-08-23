/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {AbstractApi} from "./AbstractApi.ts";
import {IPage, IPageParam, IProjectInfo, ProjectDataType} from "../designer/DesignerType.ts";
import URLUtil from "../utils/URLUtil.ts";
import {globalMessage} from "../framework/message/GlobalMessage.tsx";
import {IImageData} from "../comps/lc/base-image/BaseImageComponent.tsx";
import FetchUtil from "../utils/FetchUtil.ts";

class BaseApi extends AbstractApi {

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
            globalMessage.messageApi?.error(res.msg);
            return {records: [], total: 0, current: 1, size: 10};
        }
    }

    public async updateProject(data: IProjectInfo): Promise<void> {
        const res = await FetchUtil.post('/api/project/update', data);
        if (res.code !== 200)
            globalMessage.messageApi?.error(res.msg);
    }

    public async uploadImage(file: File): Promise<IImageData | boolean> {
        const {id} = URLUtil.parseUrlParams();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('projectId', id);
        formData.append('type', "1");

        const res = await FetchUtil.post('/api/image/upload', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        return res.code === 200 ? {url: res.data} : false;
    }

    async getImageSourceList(): Promise<IImageData[]> {
        const res = await FetchUtil.post(`/api/image/pageList`, {
            current: 1,
            size: 1000
        });
        if (res.code === 200)
            return res.data.records;
        else {
            globalMessage.messageApi?.error(res.msg);
            return [];
        }
    }

    public async delImageSource(imageId: string): Promise<boolean> {
        const res = await FetchUtil.post(`/api/image/batchDelete`, [imageId]);
        if (res.code === 200) {
            globalMessage.messageApi?.success("操作成功");
            return true;
        } else {
            globalMessage.messageApi?.error(res.msg);
            return false;
        }
    }

    public async uploadCover(file: File): Promise<boolean> {
        const {id} = URLUtil.parseUrlParams();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);

        const res = await FetchUtil.post('/api/project/cover', formData, {headers: {'Content-Type': 'multipart/form-data'}});
        return res.code === 200;
    }

    public async exportProjectApi(projectDependency: any) {
        return await FetchUtil.post('/api/project/exportProject', projectDependency);
    }

}

const baseApi = new BaseApi();
export default baseApi;