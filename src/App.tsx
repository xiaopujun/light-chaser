import React, {Component} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Routes, Route} from "react-router-dom";
import LCDesigner from "./component/designer";
import Preview from "./component/designer/Preview";
import LightChaserList from "./component/designer/LightChaserList";

class App extends Component<any> {
    render() {
        return (
            <Routes>
                <Route path={'/'} element={<LightChaserList/>}/>
                <Route path={'/designer'} element={<LCDesigner/>}/>
                <Route path={'/preview'} element={<Preview/>}/>
            </Routes>
        );
    }
}

export default App;
