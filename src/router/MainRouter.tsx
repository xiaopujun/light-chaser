import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Loading from "../json-schema/ui/loading/Loading.tsx";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";
import GlobalMessage from "../framework/message/GlobalMessage.tsx";
//加载全局字体，这个需要考量一下，在此处加载是否合适
import '../designer/resource/font/FontGlobal.css';
import URLUtil from "../utils/URLUtil.ts";
import {SaveType} from "../designer/DesignerType.ts";
import {LocalProjectList} from "../pages/home/local-list/LocalProjectList.tsx";
import {ServerProjectList} from "../pages/home/server-list/ServerProjectList.tsx";
import {DatasourceManager} from "../pages/home/datasource/DatasourceManager.tsx";
import {TemplateMarket} from "../pages/home/template-market/TemplateMarket.tsx";

const Demo = lazy(() => import('../test/Demo.tsx'));
const Login = lazy(() => import('../pages/login/Login.tsx').then(module => ({default: module.Login})));
const Designer = lazy(() => import('../designer/Designer.tsx'));
const DesignerView = lazy(() => import('../designer/view/DesignerView.tsx'));
const Home = lazy(() => import('../pages/home/Home.tsx'));


export const DesignerRouter = () => {
    const {saveType, id} = URLUtil.parseUrlParams();
    return <Designer id={id} type={saveType as SaveType}/>
}

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

const router = createBrowserRouter([
    {
        path: '/view',
        element: <DesignerView/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/home',
        element: <Home/>,
        children: [
            {
                path: 'local',
                element: <LocalProjectList/>,
            },
            {
                path: 'server',
                element: <ServerProjectList/>,
            },
            {
                path: 'datasource',
                element: <DatasourceManager/>,
            },
            {
                path: 'template',
                element: <TemplateMarket/>,
            }
        ]
    },
    {
        path: '/test',
        element: <Demo/>
    },
    {
        path: '/designer',
        element: <DesignerRouter/>
    },
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '*',
        element: <div>not found</div>
    }
])

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
                <RouterProvider router={router}/>
            </Suspense>
            <GlobalMessage/>
        </ConfigProvider>
    );
}

