import MonacoEditor, {MonacoEditorProps} from "./MonacoEditor.tsx";
import {FullScreen} from "@icon-park/react";
import {useRef, useState} from "react";
import FullEditor from "./FullEditor.tsx";

interface CodeEditorProps extends MonacoEditorProps {
    fullScreen?: boolean;
}


export default function CodeEditor(props: CodeEditorProps) {
    const {fullScreen, value, defaultValue, onChange, ...otherProps} = props;
    const controlled: boolean = !!value && !defaultValue;
    const finalValueRef = useRef(controlled ? value : defaultValue);
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    const fullEditorChange = (v?: string) => {
        finalValueRef.current = v ?? '';
        setCount(count + 1);
    }

    const onChangeHandler = (v?: string) => {
        finalValueRef.current = v ?? '';
        onChange?.(v);
    }

    return (
        <div className="code-editor-container">
            <MonacoEditor {...otherProps} onChange={onChangeHandler} value={finalValueRef.current}/>
            <div className={'monaco-editor-button-bar'}>
                {fullScreen &&
                    <span className="editor-full-btn">
                        <FullScreen onClick={() => setOpen(true)}/>
                    </span>}
            </div>
            {open ?
                <FullEditor {...otherProps} defaultValue={finalValueRef.current} onChange={fullEditorChange}
                            onClose={() => setOpen(false)}/> : null}
        </div>
    )
}