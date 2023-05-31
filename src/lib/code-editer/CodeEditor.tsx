import React, {Component} from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import './lc-dark.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/edit/matchbrackets.js';
import 'codemirror/addon/comment/comment.js';
import js_beautify from 'js-beautify';

interface CodeEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    width?: string;
    height?: string;
    mode?: 'javascript' | 'html' | 'css' | 'sql';
}

class CodeEditor extends Component<CodeEditorProps> {
    editorRef: any = null;
    editor: any = null;

    componentDidMount() {
        if (this.editorRef == null)
            return;
        const {onChange, value, readonly, width, height, mode} = this.props;
        this.editor = CodeMirror(this.editorRef, {
            mode: mode || 'javascript',
            theme: 'lc-dark',
            lineNumbers: true,
            matchBrackets: true,
            smartIndent: true,
            readOnly: readonly || false,
            extraKeys: {
                'Ctrl-/': 'toggleComment',
                'Ctrl-Alt-L': this.formatCode,
            },
        });
        this.editor.on('change', () => {
            onChange && onChange(this.editor.getValue());
        });
        this.editor.setValue(value || '');
        this.editor.setSize(width || '100%', height || '100%');
        this.formatCode();
    }

    formatCode = () => {
        if (!this.editor) return;
        const code = this.editor.getValue();
        const formatted = js_beautify(code, {
            indent_size: 2,
            space_in_empty_paren: true,
        });
        this.editor.setValue(formatted);
    };

    render() {
        return (
            <div className={'lc-code-editor'} style={{border: '1px solid #373738'}} ref={dom => this.editorRef = dom}/>
        );
    }
}

export default CodeEditor;