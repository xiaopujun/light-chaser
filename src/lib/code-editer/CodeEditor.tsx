import React, {Component} from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/comment/comment.js';

interface CodeEditorProps {
    value?: string;
    onChange?: (value: string) => void;
}

class CodeEditor extends Component<CodeEditorProps> {
    editorRef: any = null;

    componentDidMount() {
        if (this.editorRef == null)
            return;
        const {onChange, value} = this.props;
        const editor = CodeMirror(this.editorRef, {
            mode: 'javascript',
            theme: 'material',
            lineNumbers: true,
            matchBrackets: true,
            smartIndent: true,
            extraKeys: {
                'Ctrl-/': 'toggleComment',
            },
        });
        editor.on('change', () => {
            onChange && onChange(editor.getValue());
        });
        editor.setValue(value || '');
        editor.setSize('100%', '100px');
    }

    render() {
        return (
            <div ref={dom => this.editorRef = dom}/>
        );
    }
}

export default CodeEditor;