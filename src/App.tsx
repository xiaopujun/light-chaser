import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.less';
import DataXLayoutDesigner from "./container/designer";
import EditTable from './component/edittable';


class App extends Component<any> {
    render() {
        return (
            // <DataXLayoutDesigner/>
            <EditTable/>
        );
    }
}

export default App;
