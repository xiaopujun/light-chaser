import React, {Component} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import DataXLayoutDesigner from "./component/designer";

class App extends Component<any> {
    render() {
        return (
            <DataXLayoutDesigner/>
        );
    }
}

export default App;
