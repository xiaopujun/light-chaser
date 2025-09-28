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

import {FormEvent, useRef} from 'react';
import Dialog from "../../../../json-schema/ui/dialog/Dialog";
import './ProjectHdItemImpl.less';
import {IProjectInfo, ProjectState} from "../../../DesignerType";
import {Grid} from "../../../../json-schema/ui/grid/Grid";
import Input from "../../../../json-schema/ui/input/Input";
import Radio from "../../../../json-schema/ui/radio/Radio";
import Select from "../../../../json-schema/ui/select/Select";
import Button from "../../../../json-schema/ui/button/Button";
import projectHdStore from "./ProjectManager.ts";
import projectManager from "./ProjectManager.ts";


const ProjectHdItemImpl = () => {
    const configRef = useRef<IProjectInfo | null>({...projectManager.projectConfig});
    const {projectVisible, setProjectVisible} = projectHdStore;
    const {name, des, state, saveType} = configRef.current!;

    const onClose = () => setProjectVisible(false);

    const doSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {updateProjectConfig} = projectManager;
        updateProjectConfig(configRef.current!);
        onClose();
    }

    return (
        <Dialog title={'项目设置'} className={'lc-header-project-set'} visible={projectVisible}
                onClose={onClose}>
            <form onSubmit={doSave}>
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <Grid gridGap={'15px'} columns={2}>
                        <Input label={'项目名称'} defaultValue={name}
                               onChange={(name) => configRef.current!.name = name}/>
                        <Input label={'项目描述'} defaultValue={des}
                               onChange={(des) => configRef.current!.des = des}/>
                        <Radio label={'项目状态'} onChange={value => configRef.current!.state = value as ProjectState}
                               containerStyle={{gridColumn: '1/3'}}
                               defaultValue={state}
                               options={[
                                   {label: '草稿', value: ProjectState.DRAFT},
                                   {label: '发布', value: ProjectState.PUBLISH},
                                   {label: '封存', value: ProjectState.SEALED}
                               ]}/>
                        <Select label={'存储类型'} options={[{value: '1', label: '本地存储'}]}
                                defaultValue={saveType}/>
                    </Grid>

                </div>
                <div className={'lc-header-project-footer'}>
                    <Button>保存</Button>
                    <Button onClick={onClose}>取消</Button>
                </div>
            </form>
        </Dialog>
    );
}

export default ProjectHdItemImpl;