import {lazy, memo} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";
import '../designer/resource/font/FontGlobal.css';

const DesignerViewPage = lazy(() => import('../pages/view/DesignerViewPage.tsx'));
const DesignerPage = lazy(() => import('../pages/designer/DesignerPage.tsx'));
const GlobalMessage = lazy(() => import('../framework/message/GlobalMessage.tsx'));
const Login = lazy(() => import('../pages/login/Login'));
const Home = lazy(() => import('../pages/home/Home'));
const LocalProjectList = lazy(() => import('../pages/home/local-list/LocalProjectList.tsx'));
const ServerProjectList = lazy(() => import('../pages/home/server-list/ServerProjectList.tsx'));
const DatasourceManager = lazy(() => import('../pages/home/datasource/DatasourceManager.tsx'));
const TemplateMarket = lazy(() => import('../pages/home/template-market/TemplateMarket.tsx'));
const Demo = lazy(() => import('../test/Demo'));

const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
    // 使用 antd 默认的暗色算法生成基础token，这样其他不需要定制的部分则保持原样
    const baseToken = theme.darkAlgorithm(seedToken, mapToken);
    return {
        ...baseToken,
        colorBgLayout: '#20252b', // Layout 背景色
        colorBgContainer: '#282c34', // 组件容器背景色
        colorBgElevated: '#32363e', // 悬浮容器背景色
    };
};

const antdComponentTheme = {
    Menu: {
        itemBg: 'none',
        itemColor: '#bfbfbf',
    }
}

const router = createBrowserRouter([
    {
        path: '/view',
        element: <DesignerViewPage/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/test',
        element: <Demo/>
    },
    {
        path: '/designer',
        element: <DesignerPage/>
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
            components: antdComponentTheme
        }}>
            <RouterProvider router={router}/>
            <GlobalMessage/>
        </ConfigProvider>
    );
})

export default MainRouter
