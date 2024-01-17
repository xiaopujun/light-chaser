import {lazy, Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import Loading from "./ui/loading/Loading";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";
import GlobalMessage from "./framework/message/GlobalMessage";

const Demo = lazy(() => import('./test/Demo.tsx'));
const Login = lazy(() => import('./pages/login/Login').then(module => ({default: module.Login})));
const Designer = lazy(() => import('./designer/Designer'));
const DesignerView = lazy(() => import('./designer/view/DesignerView'));
const Home = lazy(() => import('./pages/home/Home'));

export const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
    // 使用 antd 默认的暗色算法生成基础token，这样其他不需要定制的部分则保持原样
    const baseToken = theme.darkAlgorithm(seedToken, mapToken);
    return {
        ...baseToken,
        colorBgLayout: '#20252b', // Layout 背景色
        colorBgContainer: '#282c34', // 组件容器背景色
        colorBgElevated: '#32363e', // 悬浮容器背景色
    };
};


export default function MainRouter() {
    return (
        <ConfigProvider theme={{
            algorithm: studioDarkAlgorithm,
            components: {
                Menu: {
                    itemBg: 'none',
                    itemColor: '#bfbfbf',
                }
            }
        }}>
            <Suspense fallback={<Loading/>}>
                <Routes>
                    <Route path={'/designer'} element={<Designer/>}/>
                    <Route path={'/view'} element={<DesignerView/>}/>
                    <Route path={'/test'} element={<Demo/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/home'} element={<Home/>}/>
                    <Route path={'/'} element={<Login/>}/>
                </Routes>
            </Suspense>
            <GlobalMessage/>
        </ConfigProvider>
    );
}