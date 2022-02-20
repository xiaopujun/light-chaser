import React, {Component} from 'react';
import 'antd/dist/antd.css';
import './App.less';
import DataXLayoutDesigner from "./container/designer";
import FillColor from "./component/config/antd/atomic_components/fill_color";


class App extends Component<any> {
    render() {
        return (
            <DataXLayoutDesigner/>
            // <FillColor fillMode={'0'} groupNumber={10} updateElemChartSet={() => {
            // }}/>
        );
    }
}

export default App;
