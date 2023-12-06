import {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Switch} from "react-router-dom";
import Loading from "./ui/loading/Loading";

const DemoMain = lazy(() => import('./test/DemoMain'));
const Login = lazy(() => import('./pages/login/Login').then(module => ({default: module.Login})));
const Designer = lazy(() => import('./designer/Designer'));
const DesignerView = lazy(() => import('./designer/view/DesignerView'));
const Home = lazy(() => import('./pages/home/Home'));

class App extends Component {
    render() {
        return (
            <>
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        <Route path={'/designer'} component={Designer}/>
                        <Route path={'/view'} component={DesignerView}/>
                        <Route path={'/test'} component={DemoMain}/>
                        <Route path={'/login'} component={Login}/>
                        <Route path={'/home'} component={Home}/>
                        <Route path={'/'} component={Login}/>
                    </Switch>
                </Suspense>
            </>
        );
    }
}

export default App;
