import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.less';
import DataXLayoutDesigner from "./container/designer";


class App extends Component<any> {
    render() {
        return (
            <DataXLayoutDesigner/>
        );
    }
}

export default App;
