import {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Switch} from "react-router-dom";
import JsonSchemaDemo from "./test/JsonSchemaDemo";
import Loading from "./ui/loading/Loading";
import {Login} from "./pages/login/Login";
import {LayerDemo} from "./test/canvas-demo/LayerDemo";
import {LayerGroupItem} from "./designer/float-configs/layer-list/group/LayerGroupItem";
import DemoMain from "./test/DemoMain";

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
                        <Route path={'/test'} component={DemoMain}/>
                        <Route path={'/layer'} component={LayerGroupItem}/>
                        <Route path={'/list'} component={LightChaserList}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/'} component={Login}/>
                    </Switch>
                </Suspense>
            </>
        );
    }
}

export default App;
