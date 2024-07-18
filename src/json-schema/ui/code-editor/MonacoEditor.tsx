import Loading from "../loading/Loading";
import Editor, {loader} from "@monaco-editor/react";
import './MonacoEditor.less';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';

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
}

export default function MonacoEditor(props: MonacoEditorProps) {
    const {value, defaultValue, onChange, language, width, height, readonly} = props;
    return (
        <div style={{width, height}} className={'monaco-editor-container'}>
            <Editor defaultLanguage={language || 'json'}
                    theme="vs-dark"
                    onChange={onChange}
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
            />
        </div>
    )
}
