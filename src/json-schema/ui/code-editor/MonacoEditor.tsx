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

import Loading from "../loading/Loading";
import {loader} from "@monaco-editor/react";
import './MonacoEditor.less';

import * as monaco from 'monaco-editor';
import EditorSimpleWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import TypeScriptWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import 'monaco-editor/esm/vs/basic-languages/sql/sql.contribution';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer.tsx";
import {Suspense, lazy} from "react";

self.MonacoEnvironment = {
    getWorker(_, label) {
        if (label === 'json')
            return new JSONWorker();
        if (label === 'typescript' || label === 'javascript')
            return new TypeScriptWorker();
        return new EditorSimpleWorker();
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
    quickSuggestions?: boolean;
}

export default function MonacoEditor(props: MonacoEditorProps) {
    const {
        value, defaultValue, onChange, language
        , width, height, readonly, quickSuggestions, ...containerProps
    } = props;
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
                                quickSuggestions: !!quickSuggestions,
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
