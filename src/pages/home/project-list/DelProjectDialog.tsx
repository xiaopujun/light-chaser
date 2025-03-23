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

import {memo} from "react";
import {Modal, Button} from "antd";

interface DelDialogProps {
    onOk: () => void;
    onCancel: () => void;
    visible: boolean;
}

const DelProjectDialog = memo((props: DelDialogProps) => {

    const {onOk, onCancel, visible} = props;

    return (
        <Modal title={'删除确认'} open={visible} onCancel={onCancel} onOk={onOk}
               width={350}
               footer={[
                   <Button type="primary" onClick={onOk}>确认</Button>,
                   <Button onClick={onCancel}>取消</Button>
               ]}>
            <div style={{color: '#aeaeae', padding: 10}}>确定要删除该项目吗？</div>
        </Modal>
    )
})

export default DelProjectDialog