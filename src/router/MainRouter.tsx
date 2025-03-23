/*
 * Copyright © 2023-2025 puyinzhen
 * All rights reserved.
 *
 * The copyright of this work (or idea/project/document) is owned by puyinzhen. Without explicit written permission, no part of this work may be reproduced, distributed, or modified in any form for commercial purposes.
 *
 * This copyright statement applies to, but is not limited to: concept descriptions, design documents, source code, images, presentation files, and any related content.
 *
 * For permission to use this work or any part of it, please contact 1182810784@qq.com to obtain written authorization.
 */

import {lazy, memo} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";

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
const NotFound = lazy(() => import('../pages/result/NotFound.tsx'));
const NoAuth = lazy(() => import('../pages/result/NoAuth.tsx'));
const Error = lazy(() => import('../pages/result/Error.tsx'));


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

const antdComponentTheme = {}

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
        path: '/notFound',
        element: <NotFound/>
    },
    {
        path: '/noAuth',
        element: <NoAuth/>
    },
    {
        path: '/error',
        element: <Error/>
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
                Select: {
                    borderRadius: 2,
                    borderRadiusLG: 2,
                    borderRadiusXS: 2,
                    borderRadiusSM: 2,
                    selectorBg: '#252525',
                    optionSelectedBg: '#29323f'
                },
                TreeSelect: {},
                InputNumber: {
                    borderRadius: 2,
                    borderRadiusLG: 2,
                    borderRadiusXS: 2,
                    borderRadiusSM: 2,
                },
                Slider: {
                    trackBg: '#0086ce',
                    trackHoverBg: '#1EB1FFFF',
                    dotBorderColor: '#7fabff',
                    handleColor: '#3e80ff',
                    railSize: 3,
                },
                Collapse: {
                    borderRadius: 2,
                    borderRadiusLG: 2,
                    borderRadiusXS: 2,
                    borderRadiusSM: 2,
                },
                Modal: {
                    borderRadiusLG: 4,
                    headerBg: '#1f1f1f',
                    colorBgContainer: '#1f1f1f',
                    colorBgElevated: '#1f1f1f',
                    paddingMD: 15,
                    paddingContentHorizontalLG: 15
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
