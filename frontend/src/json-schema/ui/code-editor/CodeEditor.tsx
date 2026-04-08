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
import {FullScreen} from "@icon-park/react";
import {useRef, useState} from "react";
import FullEditor from "./FullEditor.tsx";

export interface CodeEditorProps extends MonacoEditorProps {
    fullScreen?: boolean;
}


export default function CodeEditor(props: CodeEditorProps) {
    const {fullScreen, value, defaultValue, onChange, ...otherProps} = props;
    const controlled: boolean = !!value && !defaultValue;
    const tempValueRef = useRef(controlled ? value : defaultValue);
    const finalValue = controlled ? value : tempValueRef.current;
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    const fullEditorChange = (v?: string) => {
        onChangeHandler(v);
        setCount(count + 1);
    }

    const onChangeHandler = (v?: string) => {
        if (!controlled)
            tempValueRef.current = v ?? '';
        onChange?.(v);
    }

    return (
        <div className="code-editor-container">
            <MonacoEditor {...otherProps} onChange={onChangeHandler} value={finalValue}/>
            <div className={'monaco-editor-button-bar'}>
                {fullScreen &&
                    <span className="editor-full-btn">
                        <FullScreen onClick={() => setOpen(true)}/>
                    </span>}
            </div>
            {open ?
                <FullEditor {...otherProps} defaultValue={finalValue} onChange={fullEditorChange}
                            onClose={() => setOpen(false)}/> : null}
        </div>
    )
}