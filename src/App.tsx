import React, {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Switch} from "react-router-dom";
import Loading from "./component/loading/Loading";
import LcDesignerStructure from "./component/designer/structure/LcDesignerStructure";
import LcStructure from "./component/designer/structure/LcStructure";
import LcHeader from "./component/designer/structure/LcHeader";
import LcBody from "./component/designer/structure/LcBody";
import LcLeft from "./component/designer/structure/LcLeft";
import LcContent from "./component/designer/structure/LcContent";
import LcRight from "./component/designer/structure/LcRight";
import LcFoot from "./component/designer/structure/LcFoot";
import StructureDemo from "./test/StructureDemo";

const LightChaserList = lazy(() => import('./component/list/LightChaserList'));
const LCDesigner = lazy(() => import('./component/designer'));
const Preview = lazy(() => import('./component/show/LcShow'));

class App extends Component<any> {
    render() {
        return (
            <>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path={'/list'} component={LightChaserList}/>
                        <Route path={'/designer'} component={LCDesigner}/>
                        <Route path={'/view'} component={Preview}/>
                        <Route path={'/loading'} component={Loading}/>
                    </Switch>
                </Suspense>
            </>
        );
    }
}

export default App;
