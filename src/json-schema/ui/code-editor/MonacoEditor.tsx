import Loading from "../loading/Loading";
import {loader} from "@monaco-editor/react";
import './MonacoEditor.less';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer.tsx";
import {Suspense, lazy} from "react";

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

const Editor = lazy(() => import('@monaco-editor/react'));

export interface MonacoEditorProps extends UIContainerProps {
    value?: string;
    defaultValue?: string;
    onChange?: (value?: string) => void;
    readonly?: boolean;
    language?: 'javascript' | 'json' | 'sql';
    width?: string | number;
    height?: string | number;
}

export default function MonacoEditor(props: MonacoEditorProps) {
    const {value, defaultValue, onChange, language, width, height, readonly, ...containerProps} = props;
    return (
        <UIContainer className={'lc-code-editor'} {...containerProps}>
            <div style={{width, height}} className={'monaco-editor-container'}>
                <Suspense fallback={<Loading/>}>
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
                </Suspense>
            </div>
        </UIContainer>

    )
}
