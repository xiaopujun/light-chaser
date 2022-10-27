import React, {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Switch} from "react-router-dom";
import Loading from "./component/loading/Loading";
import {Spin} from "antd";

const LightChaserList = lazy(() => import('./component/list/LightChaserList'));
const LCDesigner = lazy(() => import('./component/designer'));
const Preview = lazy(() => import('./component/preview/Preview'));

class App extends Component<any> {
    render() {
        return (
            <Suspense fallback={<Spin tip={'L O A D I N G . . .'}/>}>
                <Switch>
                    <Route path={'/list'} component={LightChaserList}/>
                    <Route path={'/designer'} component={LCDesigner}/>
                    <Route path={'/view'} component={Preview}/>
                    <Route path={'/loading'} component={Loading}/>
                </Switch>
            </Suspense>
        );
    }
}

export default App;
