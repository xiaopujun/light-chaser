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
    defaultValue?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    width?: string;
    height?: string;
    mode?: 'javascript' | 'html' | 'css' | 'sql';
}

class CodeEditor extends Component<CodeEditorProps> {
    editorDom: any = null;
    editor: any = null;
    valueControl: boolean = true;
    value: string = '';

    constructor(props: CodeEditorProps) {
        super(props);
        const {value, defaultValue} = props;
        this.valueControl = value !== undefined;
        this.value = value || defaultValue || '';
    }

    componentDidMount() {
        if (this.editorDom == null)
            return;
        const {readonly, width, height, mode} = this.props;
        this.editor = CodeMirror(this.editorDom, {
            mode: mode || 'javascript',
            theme: 'lc-dark',
            lineNumbers: true,
            matchBrackets: true,
            smartIndent: true,
            readOnly: readonly || false,
            extraKeys: {
                'Ctrl-/': 'toggleComment',
                'Ctrl-Alt-L': this.formatCodeShortKey,
            },
        });
        this.editor.setValue((this.value && js_beautify(this.value, {
            indent_size: 2,
            space_in_empty_paren: true,
        })) || '');
        this.editor.on('change', this.onChange);
        this.editor.setSize(width || '100%', height || '100%');
    }

    onChange = () => {
        const {onChange} = this.props;
        onChange && onChange(this.editor.getValue());
    }

    formatCodeShortKey = () => {
        if (!this.editor) return;
        const code = this.editor.getValue();
        const formatted = js_beautify(code, {
            indent_size: 2,
            space_in_empty_paren: true,
        });
        this.editor.setValue(formatted);
    };

    formatCode = (code: string) => {
        return js_beautify(code, {
            indent_size: 2,
            space_in_empty_paren: true,
        });
    }

    render() {
        if (this.valueControl && this.editor) {
            this.editor.off('change', this.onChange);
            this.editor.setValue(this.formatCode(this.props.value || ''), 0);
            this.editor.on('change', this.onChange);
        }
        return (
            <div className={'lc-code-editor'} style={{border: '1px solid #373738'}} ref={dom => this.editorDom = dom}/>
        );
    }
}

export default CodeEditor;