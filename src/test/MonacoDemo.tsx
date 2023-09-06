import React, {Component} from 'react';
import Editor from "@monaco-editor/react";

class MonacoDemo extends Component {

    monacoContainer: any = null;

    // componentDidMount(): void {
    //     monaco.editor.create(this.monacoContainer, {
    //         value: "function foo() {\n console.log('foo');\n}",
    //         theme: 'vs-dark',
    //         minimap: {
    //             enabled: false,
    //         },
    //         language: 'javascript',
    //         quickSuggestions: false,
    //     });
    // }

    render() {
        return (
            <Editor
                height="90vh"
                defaultLanguage="javascript"
                defaultValue="function foo() {
                 console.log('foo');
                 }"
                theme="vs-dark"
                // onMount={handleEditorDidMount}
            />
        );
    }
}

export default MonacoDemo;