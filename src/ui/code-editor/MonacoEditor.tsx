import React from "react";
import Loading from "../loading/Loading";
import Editor from "@monaco-editor/react";
import js_beautify from "js-beautify";

export interface MonacoEditorProps {
    value?: string;
    onChange?: (value?: string) => void;
    language?: 'javascript' | 'json';
    width?: string | number;
    height?: string | number;
    readonly?: boolean;
    style?: React.CSSProperties;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = (props) => {
    const {value, onChange, language, width, height, readonly = false, style} = props;

    //格式化代码
    const code = js_beautify(value!, {
        indent_size: 2,
        space_in_empty_paren: true,
        end_with_newline: true
    })

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
                    value={code || ''}/>
        </div>
    )
}
