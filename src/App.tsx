import {Component, lazy, Suspense} from 'react';
import 'antd/dist/antd.min.css';
import './App.less';
import {Route, Routes} from "react-router-dom";
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
                    <Routes>
                        <Route path={'/designer'} element={<Designer/>}/>
                        <Route path={'/view'} element={<DesignerView/>}/>
                        <Route path={'/test'} element={<DemoMain/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/home'} element={<Home/>}/>
                        <Route path={'/'} element={<Login/>}/>
                    </Routes>
                </Suspense>
            </>
        );
    }
}

export default App;
