import {lazy, memo} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";
import NotFound from "../pages/result/NotFound.tsx";

const DesignerViewPage = lazy(() => import('../pages/view/DesignerViewPage.tsx'));
const DesignerPage = lazy(() => import('../pages/designer/DesignerPage.tsx'));
const GlobalMessage = lazy(() => import('../framework/message/GlobalMessage.tsx'));
const GlobalModal = lazy(() => import('../framework/message/GlobalModal.tsx'));
const Login = lazy(() => import('../pages/login/Login'));
const Home = lazy(() => import('../pages/home/Home'));
const LocalProjectList = lazy(() => import('../pages/home/local-list/LocalProjectList.tsx'));
const ServerProjectList = lazy(() => import('../pages/home/server-list/ServerProjectList.tsx'));
const DataSourceList = lazy(() => import('../pages/home/datasource/DataSourceList.tsx'));
const TemplateMarket = lazy(() => import('../pages/home/template-market/TemplateMarket.tsx'));
const MoreInfo = lazy(() => import('../pages/home/more-info/MoreInfo.tsx'));
const Demo = lazy(() => import('../test/Demo'));
const UserManagement = lazy(() => import('../pages/home/user-management/UserManagement.tsx'));
const RoleManagement = lazy(() => import('../pages/home/role-management/RoleManagement.tsx'));
const UserInfo = lazy(() => import('../pages/home/user-info/UserInfo.tsx'));
const PermissionManagement = lazy(() => import('../pages/home/permission-management/PermissionManagement.tsx'));


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
        itemSelectedBg: 'none',
        itemBorderRadius: 2
    },
    Table: {
        borderRadius: 2,
        headerBorderRadius: 2,
        cellPaddingBlock: 12,
        headerBg: '#343434',
        colorBgContainer: '#252525',
    },
    Input: {
        borderRadius: 2,
        borderRadiusLG: 2,
        borderRadiusXS: 2,
        borderRadiusSM: 2,
        colorBgContainer: '#252525',
    },
    Button: {
        borderRadius: 2,
        borderRadiusLG: 2,
        borderRadiusXS: 2,
        borderRadiusSM: 2,
    },

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
                element: <DataSourceList/>,
            },
            {
                path: 'template',
                element: <TemplateMarket/>,
            },
            {
                path: 'user',
                element: <UserManagement/>,
            },
            {
                path: 'role',
                element: <RoleManagement/>,
            },
            {
                path: 'permission',
                element: <PermissionManagement/>,
            },
            // {
            //     path: 'project',
            //     element: <ProjectManagement/>,
            // },
            {
                path: 'userInfo',
                element: <UserInfo/>
            },
            {
                path: 'more',
                element: <MoreInfo/>
            }
        ]
    },
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '*',
        element: <NotFound/>
    }
])

const MainRouter = memo(() => {
    return (
        <ConfigProvider theme={{
            algorithm: studioDarkAlgorithm,
            components: {
                ...antdComponentTheme,
                Select: {
                    borderRadius: 2,
                    borderRadiusLG: 2,
                    borderRadiusXS: 2,
                    borderRadiusSM: 2,
                    selectorBg: '#252525'
                },
                TreeSelect: {
                }
            }
        }}>
            <RouterProvider router={router}/>
            <GlobalMessage/>
            <GlobalModal/>
        </ConfigProvider>
    );
})

export default MainRouter
