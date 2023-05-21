import React, {Component} from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import './lc-dark.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/comment/comment.js';

interface CodeEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    width?: string;
    height?: string;
    mode?: string;
}

class CodeEditor extends Component<CodeEditorProps> {
    editorRef: any = null;

    componentDidMount() {
        if (this.editorRef == null)
            return;
        const {onChange, value, readonly, width, height, mode} = this.props;
        const editor = CodeMirror(this.editorRef, {
            mode: mode || 'javascript',
            theme: 'lc-dark',
            lineNumbers: true,
            matchBrackets: true,
            smartIndent: true,
            readOnly: readonly || false,
            extraKeys: {
                'Ctrl-/': 'toggleComment',
            },
        });
        editor.on('change', () => {
            onChange && onChange(editor.getValue());
        });
        editor.setValue(value || '');
        editor.setSize(width || '100%', height || '100%');
    }

    render() {
        return (
            <div className={'lc-code-editor'} ref={dom => this.editorRef = dom}/>
        );
    }
}

export default CodeEditor;