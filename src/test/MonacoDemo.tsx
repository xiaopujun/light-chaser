import React, {Component} from 'react';
import * as monaco from 'monaco-editor';

class MonacoDemo extends Component {

    monacoContainer: any = null;

    componentDidMount(): void {
        monaco.editor.create(this.monacoContainer, {
            value: "function foo() {\n console.log('foo');\n}",
            theme: 'vs-dark',
            minimap: {
                enabled: false,
            },
            language: 'javascript',
        });
    }

    render() {
        return (
            <div id={'monaco_demo'} ref={ref => this.monacoContainer = ref} style={{width: '100%', height: '100%'}}/>
        );
    }
}

export default MonacoDemo;