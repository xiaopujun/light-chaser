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

import './ProjectItem.less';

import {CopyOne, Delete, Edit, MoreOne, PreviewOpen} from "@icon-park/react";
import {Button, Dropdown, Input, type MenuProps} from "antd";
import {useState} from "react";

import {IProjectInfo, SaveType} from "../../../designer/DesignerType.ts";
import baseApi from "../../../api/BaseApi.ts";

export interface ProjectItemProps {
    id: string;
    name: string;
    cover?: string;
    saveType: SaveType;
    doOperate: (id: string, type: string) => void;
}

export default function ProjectItem(props: ProjectItemProps) {
    const {cover, id, doOperate} = props;
    const [rename, setRename] = useState(false);
    const [name, setName] = useState(props.name);

    const moreActions: MenuProps['items'] = [
        {
            key: 'preview',
            label: '预览',
            icon: <PreviewOpen size={14}/>,
            onClick: () => doOperate(id, 'show')
        },
        {
            key: 'edit',
            label: '编辑',
            icon: <Edit size={14}/>,
            onClick: () => doOperate(id, 'edit')
        },
        {
            key: 'clone',
            label: '复制',
            icon: <CopyOne size={14}/>,
            onClick: () => doOperate(id, 'clone')
        },
        {
            key: 'delete',
            label: '删除',
            icon: <Delete size={14}/>,
            onClick: () => doOperate(id, 'del')
        }
    ];

    const updateName = () => {
        if (name !== props.name) {
            const data: IProjectInfo = {id, name};
            baseApi.updateProject(data);
        }
    };

    return (
        <div className="project-list-item">
            <div className="project-item-cover" style={{backgroundImage: `url(${cover})`}}>
                <div className="operate-icon-list">
                    <div className="operate-btn">
                        <Button type="default" onClick={() => doOperate(id, 'show')}>预览</Button>
                    </div>
                    <div className="operate-btn">
                        <Button type="primary" onClick={() => doOperate(id, 'edit')}>编辑</Button>
                    </div>
                </div>
            </div>
            <div className="project-item-content">
                <div className="project-name">
                    {rename ? (
                        <div className="project-rename-input">
                            <Input
                                autoFocus={true}
                                size="small"
                                value={name}
                                onBlur={() => {
                                    updateName();
                                    setRename(false);
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        updateName();
                                        setRename(false);
                                    }
                                }}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className="project-name-content-wrapper">
                            <div className="project-name-content" title={name}>{name}</div>
                            <div className="rename-icon" onClick={() => setRename(true)}>
                                <Edit size={14}/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="more-actions">
                    <Dropdown menu={{items: moreActions}} trigger={['click']} placement="bottomRight">
                        <div className="more-actions-trigger" aria-label="更多操作">
                            <MoreOne size={16}/>
                        </div>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}
