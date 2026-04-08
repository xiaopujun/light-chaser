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

import {action, makeObservable, observable, toJS} from "mobx";
import AbstractManager from "../../../manager/core/AbstractManager.ts";
import {IProjectInfo, ProjectState, SaveType} from "../../../DesignerType.ts";

class ProjectManager extends AbstractManager<IProjectInfo> {
    constructor() {
        super();
        makeObservable(this, {
            projectVisible: observable,
            setProjectVisible: action,
            projectConfig: observable,
            updateProjectConfig: action,
        })
    }

    projectVisible: boolean = false;

    setProjectVisible = (visible: boolean) => this.projectVisible = visible;

    /**
     * 项目设置
     */
    projectConfig: IProjectInfo = {
        name: "", //项目名称
        des: "", //项目描述
        state: ProjectState.DRAFT, //项目状态
        createTime: "", //创建时间
        updateTime: "", //更新时间
        saveType: SaveType.LOCAL, //存储类型
    };

    /**
     * 更新项目配置
     */
    updateProjectConfig = (data: IProjectInfo) => this.projectConfig = {...this.projectConfig, ...data};

    destroy(): void {
    }

    getData(): IProjectInfo {
        return toJS(this.projectConfig);
    }

    init(data: IProjectInfo): void {
    }


}

const projectHdStore = new ProjectManager();
export default projectHdStore;