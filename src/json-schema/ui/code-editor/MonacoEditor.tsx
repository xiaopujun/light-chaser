import Loading from "../loading/Loading";
import { useRef, useState } from 'react';
import Editor, {loader, Monaco} from "@monaco-editor/react";
import './MonacoEditor.less';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
import { Button } from "antd";
import { Extend } from '@icon-park/react';
import MonacoEditorDialog from "./MonacoEditorDialog";
import monacoEditorDialogManager from "./MonacoEditorDialogManager";

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
    readonly?: boolean;
    language?: 'javascript' | 'json' | 'sql';
    width?: string | number;
    height?: string | number;
    showExtend?: boolean;
}

export default function MonacoEditor(props: MonacoEditorProps) {
    const {value, defaultValue, onChange, language, width, height, readonly, showExtend} = props;

    const monacoRef = useRef(null);
    const editorRef = useRef(null);
    const [currentLine, setCurrentLine] = useState(1);
    const [currentCol, setCurrentCol] = useState(1);
    const [extendProps, setExtendProps] = useState({...props,showExtend: false});

    function handleEditorDidMount(editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) {
        editor.onDidChangeCursorPosition(()=>{
            const pos = editor.getPosition()
            if(pos){
                setCurrentLine(pos.lineNumber);
                setCurrentCol(pos.column);
            }
        })
        editorRef.current = editor;
        monacoRef.current = monaco;
    }

    function handleChange(value:string | undefined){
        setExtendProps({...extendProps,value: value});
        onChange && onChange(value);
    }

    const handleDialogOpen = () => {
        monacoEditorDialogManager.setCloseHandler(handleDialogClose);
        monacoEditorDialogManager.setProps(extendProps);
        monacoEditorDialogManager.setVisibility(true);
    }

    const handleDialogClose = (props: MonacoEditorProps) => {
        editorRef.current.setValue(props.value ? props.value : props.defaultValue);
        monacoEditorDialogManager.resetCloseHandler();
    }

    return (
        <div className={'monaco-editor-container'}>
            <div style={{width, height}} className={'monaco-editor-main'}>
                <Editor defaultLanguage={language || 'json'}
                        theme="vs-dark"
                        onChange={handleChange}
                        height={'100%'}
                        width={'100%'}
                        options={{
                            minimap: {enabled: false},
                            quickSuggestions: false,
                            folding: false,
                            readOnly: readonly || false,
                            renderValidationDecorations: 'off',
                            mouseWheelZoom: true,
                            scrollBeyondLastLine: false,
                            renderLineHighlight: 'none',
                            hideCursorInOverviewRuler: true,
                            overviewRulerLanes: 0,
                            overviewRulerBorder: false,
                        }}
                        loading={<Loading/>}
                        value={value}
                        defaultValue={defaultValue}
                        onMount={handleEditorDidMount}
                />
            </div>
            <div className={'monaco-editor-buttom-bar'}>
                <div>
                    <span className={'monaco-editor-status-item'}>行 {currentLine}, 列 {currentCol}</span>
                    <span className={'monaco-editor-status-item left-border'}>语言 {language || 'json'}</span>
                </div>
                {showExtend && <Button style={{float: 'right'}} type='text' size='small' icon={<Extend />} onClick={handleDialogOpen} />}
            </div>
        </div>
    )
}
