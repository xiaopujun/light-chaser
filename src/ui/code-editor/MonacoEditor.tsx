import React from "react";
import Loading from "../loading/Loading";
import Editor from "@monaco-editor/react";

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
