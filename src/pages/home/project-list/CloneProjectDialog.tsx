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

import React from "react";
import {Button, Modal} from "antd";

interface CloneDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const CloneProjectDialog = (props: CloneDialogProps) => {

    const {onOk, onCancel, visible} = props;


    const onClick = (event: React.MouseEvent): void => {
        event.preventDefault();
        onOk();
    }

    return (
        <Modal title={'克隆项目'} open={visible} onCancel={onCancel} onOk={onClick}
               width={350}
               footer={[
                   <Button key={'ok'} type="primary" onClick={onClick}>确认</Button>,
                   <Button key={'cancel'} onClick={onCancel}>取消</Button>
               ]}>
            <div style={{color: '#a7a7a7', padding: 10}}>确认克隆项目吗？</div>
        </Modal>
    )
}

export default CloneProjectDialog;