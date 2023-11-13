import React from "react";
import Loading from "../loading/Loading";
import Editor from "@monaco-editor/react";

import {loader} from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json')
            return new jsonWorker();
        if (label === 'typescript' || label === 'javascript')
            return new tsWorker();
        return new editorWorker();
    },
};

loader.config({monaco});

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
