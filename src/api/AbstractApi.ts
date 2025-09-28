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

import {IPage, IPageParam, IProjectInfo, ProjectDataType} from "../designer/DesignerType.ts";
import {IImageData} from "../comps/lc/base-image/BaseImageComponent.tsx";

export abstract class AbstractApi {
    /**
     * 创建项目
     * @param project 项目初始化数据
     */
    public abstract createProject(project: IProjectInfo): Promise<string>;

    /**
     * 更新项目数据
     * @param projectData 项目数据
     */
    public abstract updateProject(projectData: IProjectInfo): Promise<void> ;

    /**
     * 删除项目（在线项目为逻辑删除，本地项目为物理删除）
     * @param id 项目id
     */
    public abstract deleteProject(id: string): Promise<boolean>;

    /**
     * 获取项目分页列表
     * @param pageParam
     */
    public abstract getProjectInfoPageList(pageParam: IPageParam): Promise<IPage<IProjectInfo>>;

    /**
     * 获取项目完整数据，包括主设计器数据和蓝图设计器数据及每一个组件的详细配置
     * @param id 项目id
     */
    public abstract getProjectData(id: string): Promise<ProjectDataType | null>;

    /**
     * 复制项目
     * @param id 项目id
     */
    public abstract copyProject(id: string): Promise<string>;

    /**
     * 上传图片资源（仅用于设计器提供的标准图片组件）
     * @param file 图片文件
     */
    public abstract uploadImage(file: File): Promise<IImageData | boolean>;

    /**
     * 获取图片资源列表
     * @param projectId 项目id
     */
    public abstract getImageSourceList(projectId: string): Promise<IImageData[]>;

    /**
     * 删除图片资源
     * @param imageId 图片id
     */
    public abstract delImageSource(imageId: string): Promise<boolean>;

    /**
     * 上传封面快照
     * @param file 图片文件
     */
    public abstract uploadCover(file: File): Promise<boolean>;
}