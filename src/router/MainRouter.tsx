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
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {ConfigProvider, MappingAlgorithm, theme} from "antd";

const DesignerViewPage = lazy(() => import('../pages/view/DesignerViewPage.tsx'));
const DesignerPage = lazy(() => import('../pages/designer/DesignerPage.tsx'));
const GlobalMessage = lazy(() => import('../framework/message/GlobalMessage.tsx'));
const GlobalModal = lazy(() => import('../framework/message/GlobalModal.tsx'));
const Home = lazy(() => import('../pages/home/Home'));
const ServerProjectList = lazy(() => import('../pages/home/server-list/ServerProjectList.tsx'));
const DataSourceList = lazy(() => import('../pages/home/datasource/DataSourceList.tsx'));
const TemplateMarket = lazy(() => import('../pages/home/template-market/TemplateMarket.tsx'));
const MoreInfo = lazy(() => import('../pages/home/more-info/MoreInfo.tsx'));
const Demo = lazy(() => import('../test/Demo'));
const NotFound = lazy(() => import('../pages/result/NotFound.tsx'));
const NoAuth = lazy(() => import('../pages/result/NoAuth.tsx'));
const Error = lazy(() => import('../pages/result/Error.tsx'));

const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
    const baseToken = theme.darkAlgorithm(seedToken, mapToken);
    return {
        ...baseToken,
        colorPrimary: '#4FB8FF',
        colorSuccess: '#3CED92',
        colorWarning: '#FFC53D',
        colorError: '#FF6E6E',
        colorBgLayout: '#1E1E2F',
        colorBgContainer: '#2C2C3E',
        colorBgElevated: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextSecondary: '#A0A0B2',
        colorBorder: '#3A3A4E',
        colorBorderSecondary: '#2C2C3E',
    };
};

const antdComponentTheme = {
    Menu: {
        itemColor: '#A0A0B2',
        itemHoverColor: '#4FB8FF',
        itemSelectedColor: '#4FB8FF',
        itemSelectedBg: 'rgba(79, 184, 255, 0.2)',
        itemBg: 'transparent',
        itemBorderRadius: 4,
        itemMarginBlock: 4,
        itemMarginInline: 8,
    },
    Table: {
        headerBg: '#2C2C3E',
        headerColor: '#FFFFFF',
        headerBorderRadius: 4,
        colorBgContainer: '#2C2C3E',
        cellPaddingBlock: 12,
        cellPaddingInline: 16,
        borderColor: '#3A3A4E',
        rowHoverBg: 'rgba(79, 184, 255, 0.1)',
    },
    Input: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        colorText: '#FFFFFF',
        borderRadius: 4,
        hoverBorderColor: '#4FB8FF',
        activeBorderColor: '#4FB8FF',
        activeShadow: '0 0 0 2px rgba(79, 184, 255, 0.2)',
    },
    Button: {
        borderRadius: 4,
        colorPrimary: '#4FB8FF',
        colorPrimaryHover: '#6FC8FF',
        colorPrimaryActive: '#3CA8DF',
        colorText: '#FFFFFF',
        colorTextDisabled: '#5A5A6E',
        controlHeight: 32,
        paddingContentHorizontal: 16,
    },
    Select: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        colorText: '#FFFFFF',
        borderRadius: 4,
        optionSelectedBg: 'rgba(79, 184, 255, 0.2)',
        optionSelectedColor: '#4FB8FF',
    },
    Modal: {
        borderRadiusLG: 8,
        headerBg: '#2C2C3E',
        colorBgElevated: '#2C2C3E',
        colorTextHeading: '#FFFFFF',
        paddingContentHorizontal: 24,
        paddingContentVertical: 20,
        paddingMD: 16,
        titleFontSize: 18,
    },
    Slider: {
        trackBg: '#4FB8FF',
        trackHoverBg: '#6FC8FF',
        handleColor: '#4FB8FF',
        railBg: '#3A3A4E',
        railSize: 4,
        handleSize: 14,
        handleSizeHover: 16,
    },
    Collapse: {
        borderRadiusLG: 4,
        colorBorder: '#3A3A4E',
        headerBg: '#2C2C3E',
        contentBg: '#2C2C3E',
        headerPadding: '12px 16px',
    },
    Card: {
        colorBgContainer: '#2C2C3E',
        borderRadiusLG: 8,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        colorBorderSecondary: '#3A3A4E',
    },
    Tabs: {
        cardBg: '#2C2C3E',
        itemColor: '#A0A0B2',
        itemSelectedColor: '#4FB8FF',
        inkBarColor: '#4FB8FF',
    }
}

const router = createBrowserRouter([
    {
        path: '/view',
        element: <DesignerViewPage/>
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
                path: 'projects',
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
        element: <Navigate to="/home/projects" replace/>
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
