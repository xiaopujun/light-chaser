import {lazy, memo} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";
import '../designer/resource/font/FontGlobal.css';
import URLUtil from "../utils/URLUtil.ts";
import {SaveType} from "../designer/DesignerType.ts";

const GlobalMessage = lazy(() => import('../framework/message/GlobalMessage.tsx'));
const Login = lazy(() => import('../pages/login/Login'));
const Designer = lazy(() => import('../designer/Designer'));
const DesignerView = lazy(() => import('../designer/view/DesignerView'));
const Home = lazy(() => import('../pages/home/Home'));
const LocalProjectList = lazy(() => import('../pages/home/local-list/LocalProjectList.tsx'));
const ServerProjectList = lazy(() => import('../pages/home/server-list/ServerProjectList.tsx'));
const DatasourceManager = lazy(() => import('../pages/home/datasource/DatasourceManager.tsx'));
const TemplateMarket = lazy(() => import('../pages/home/template-market/TemplateMarket.tsx'));
const Demo = lazy(() => import('../test/Demo'));


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

const MainRouter = memo(() => {
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
            <RouterProvider router={router}/>
            <GlobalMessage/>
        </ConfigProvider>
    );
})

export default MainRouter
