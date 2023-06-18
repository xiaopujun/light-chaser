import React, {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Switch} from "react-router-dom";
import Loading from "./lib/loading/Loading";
import DemoMain from "./test/DemoMain";

const LightChaserList = lazy(() => import('./list/LightChaserList'));
const Designer = lazy(() => import('./designer/Designer'));
const DesignerView = lazy(() => import('./designer/view/DesignerView'));

class App extends Component<any> {
    render() {
        return (
            <>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path={'/list'} component={LightChaserList}/>
                        <Route path={'/designer'} component={Designer}/>
                        <Route path={'/view'} component={DesignerView}/>
                        <Route path={'/loading'} component={Loading}/>
                        <Route path={'/test'} component={DemoMain}/>
                    </Switch>
                </Suspense>
            </>
        );
    }
}

export default App;
