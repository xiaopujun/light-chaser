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

import React, {MouseEvent} from 'react';
import './NewProjectDialog.less';
import {Grid} from "../../../json-schema/ui/grid/Grid";
import NumberInput from "../../../json-schema/ui/input/NumberInput.tsx";
import Input from "../../../json-schema/ui/input/Input";
import {Button, Modal} from "antd";

export interface INewProjectInfo {
    name: string;
    des?: string;
    width: number;
    height: number;
}

interface AddNewScreenDialogProps {
    onOk?: (data: INewProjectInfo) => void;
    onCancel?: () => void;
    visible?: boolean;
}

export const NewProjectDialog: React.FC<AddNewScreenDialogProps> = (props) => {

    const projectInfo: INewProjectInfo = {
        name: '未命名项目',
        des: '',
        width: 1920,
        height: 1080,
    }

    const onOk = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const {onOk} = props;
        onOk && onOk(projectInfo);
    }

    const onCancel = () => {
        const {onCancel} = props;
        onCancel && onCancel();
    }

    const {visible = false} = props;
    return (
        <Modal title={'新建大屏'} open={visible} className={'add-new-screen-dialog'} onCancel={onCancel} footer={[
            <Button key={'ok'} type={"primary"} onClick={onOk}>创建</Button>,
            <Button key={'cancel'} onClick={onCancel}>取消</Button>
        ]}>
            <div className={'lc-add-new-screen'}>
                <Grid gridGap={'15px'} columns={2}>
                    <Input label={'名称'} defaultValue={projectInfo.name}
                           onChange={(name: string | number) => projectInfo.name = name as string}/>
                    <Input label={'描述'}
                           onChange={(description: string | number) => projectInfo.des = description as string}/>
                    <NumberInput label={'宽度'} min={300} defaultValue={projectInfo.width}
                                 onChange={(width: string | number) => projectInfo.width = Number(width)}/>
                    <NumberInput label={'高度'} min={300} defaultValue={projectInfo.height}
                                 onChange={(height: number | string) => projectInfo.height = Number(height)}/>
                </Grid>
            </div>
            <div className={'add-new-screen-explain'}>
                <p>说明：1、名称不超过20字，描述不超过60字。2、宽度必须&ge;500，高度必须&ge;300</p>
            </div>
        </Modal>
    );
}

export default NewProjectDialog;