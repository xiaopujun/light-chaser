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

import MonacoEditor, {MonacoEditorProps} from "./MonacoEditor.tsx";
import {useRef} from "react";
import {Button, Modal} from "antd";

export interface FullEditorProps extends MonacoEditorProps {
    onClose?: () => void;
}

export default function FullEditor(props: FullEditorProps) {
    const {value, defaultValue} = props;
    const {onClose, onChange, ...restProps} = props;
    const valueRef = useRef(value ?? defaultValue);

    const _onChange = (value?: string) => {
        valueRef.current = value || "";
    }

    const _onSave = () => {
        onChange && onChange(valueRef.current);
        onClose && onClose();
    }

    const _editProps = {...restProps, label: undefined};

    return (
        <Modal title={'代码编辑'} open={true} width={1000} onCancel={onClose}
               footer={[
                   <Button key={'save'} style={{width: 70, height: 30}} onClick={_onSave} type="primary">保存</Button>,
                   <Button key={'cancel'} style={{width: 70, height: 30}} onClick={onClose}>取消</Button>
               ]}>
            <MonacoEditor onChange={_onChange} {..._editProps} quickSuggestions={true} height={600}/>
        </Modal>
    )
}