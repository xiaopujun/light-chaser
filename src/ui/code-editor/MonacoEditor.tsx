import React, {useEffect} from "react";
import Loading from "../loading/Loading";
import Editor, {useMonaco} from "@monaco-editor/react";
import js_beautify from "js-beautify";

export interface MonacoEditorProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value?: string) => void;
    language?: 'javascript' | 'json';
    width?: string | number;
    height?: string | number;
    readonly?: boolean;
    style?: React.CSSProperties;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = (props) => {
    const {value, defaultValue, onChange, language, width, height, readonly = false, style} = props;
    console.log('MonacoEditor', value, defaultValue, onChange, language, width, height, readonly, style)
    const monaco = useMonaco();
    // useEffect(() => {
    //     if (monaco) {
    //         monaco.editor.addCommand({
    //             id: "editor.action.formatDocument",
    //             run: js_beautify,
    //         })
    //     }
    // }, [monaco])

    return (
        <div style={{width, height, border: '1px solid #414141', ...style}} className={'monaco-editor-container'}>
            <Editor defaultLanguage={language || 'json'}
                    theme="vs-dark"
                    onChange={onChange}
                    height={'100%'}
                    width={'100%'}
                    options={{
                        minimap: {enabled: false},
                        quickSuggestions: false,
                        folding: false,
                        readOnly: readonly,
                    }}
                    loading={<Loading/>}
                    value={value}
                    defaultValue={defaultValue}
            />
        </div>
    )
}
