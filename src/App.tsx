import React, {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Switch} from "react-router-dom";
import Loading from "./lib/loading/Loading";
import MonacoDemo from "./test/MonacoDemo";

const LightChaserList = lazy(() => import('./list/LightChaserList'));
const Designer = lazy(() => import('./designer/Designer'));
const DesignerView = lazy(() => import('./designer/view/DesignerView'));

class App extends Component {
    render() {
        return (
            <>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path={'/designer'} component={Designer}/>
                        <Route path={'/view'} component={DesignerView}/>
                        <Route path={'/test'} component={MonacoDemo}/>
                        <Route path={'/'} component={LightChaserList}/>
                    </Switch>
                </Suspense>
            </>
        );
    }
}

export default App;
