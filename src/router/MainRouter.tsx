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
        // 核心色彩系统
        colorPrimary: '#4FB8FF',
        colorSuccess: '#3CED92',
        colorWarning: '#FFC53D',
        colorError: '#FF6E6E',
        colorInfo: '#4FB8FF',
        colorBgBase: '#1E1E2F',
        colorBgLayout: '#1E1E2F',
        colorBgContainer: '#2C2C3E',
        colorBgElevated: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextSecondary: '#A0A0B2',
        colorTextTertiary: '#6A6A7A',
        colorBorder: '#3A3A4E',
        colorBorderSecondary: '#2C2C3E',

        // 尺寸系统
        borderRadius: 4,
        borderRadiusSM: 2,
        borderRadiusLG: 8,
        borderRadiusXS: 2,

        // 字体系统
        fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`,
        fontSize: 14,
        fontSizeSM: 12,
        fontSizeLG: 16,
        fontSizeXL: 18,
        fontSizeHeading1: 24,
        fontSizeHeading2: 20,
        fontSizeHeading3: 18,
        fontSizeHeading4: 16,
        fontSizeHeading5: 14,

        // 间距系统
        padding: 16,
        paddingSM: 12,
        paddingXS: 8,
        paddingXXS: 4,
        margin: 16,
        marginSM: 12,
        marginXS: 8,
        marginXXS: 4,
        controlHeight: 32,
        controlHeightSM: 24,
        controlHeightLG: 40,
    };
};

const antdComponentTheme = {
    // 全局覆盖配置
    common: {
        motionDurationMid: '0.2s',
        motionDurationFast: '0.1s',
        motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },

    // 菜单组件
    Menu: {
        itemColor: '#A0A0B2',
        itemHoverColor: '#4FB8FF',
        itemSelectedColor: '#4FB8FF',
        itemSelectedBg: 'rgba(79, 184, 255, 0.2)',
        itemBg: 'transparent',
        itemBorderRadius: 4,
        itemMarginBlock: 4,
        itemMarginInline: 8,
        activeBarWidth: 3,
        itemPaddingInline: 12,
        horizontalItemHoverBg: 'transparent',
        horizontalItemSelectedBg: 'transparent',
    },

    // 表格组件
    Table: {
        headerBg: '#2C2C3E',
        headerColor: '#FFFFFF',
        headerBorderRadius: 4,
        colorBgContainer: '#2C2C3E',
        cellPaddingBlock: 12,
        cellPaddingInline: 16,
        borderColor: '#3A3A4E',
        rowHoverBg: 'rgba(79, 184, 255, 0.1)',
        rowSelectedBg: 'rgba(79, 184, 255, 0.15)',
        rowSelectedHoverBg: 'rgba(79, 184, 255, 0.2)',
        footerBg: '#2C2C3E',
        footerColor: '#A0A0B2',
        headerSplitColor: 'transparent',
        fixedHeaderSortActiveBg: '#3A3A4E',
    },

    // 输入框组件
    Input: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextPlaceholder: '#6A6A7A',
        borderRadius: 4,
        hoverBorderColor: '#4FB8FF',
        activeBorderColor: '#4FB8FF',
        activeShadow: '0 0 0 2px rgba(79, 184, 255, 0.2)',
        paddingInline: 12,
        paddingInlineSM: 8,
        paddingBlock: 8,
        paddingBlockSM: 4,
        addonBg: '#3A3A4E',
    },

    // 按钮组件
    Button: {
        borderRadius: 4,
        colorPrimary: '#4FB8FF',
        colorPrimaryHover: '#6FC8FF',
        colorPrimaryActive: '#3CA8DF',
        colorText: '#FFFFFF',
        colorTextDisabled: '#5A5A6E',
        colorBgContainerDisabled: '#3A3A4E',
        controlHeight: 32,
        controlHeightSM: 24,
        controlHeightLG: 40,
        paddingContentHorizontal: 16,
        paddingContentHorizontalSM: 12,
        paddingContentHorizontalLG: 20,
        defaultBorderColor: '#3A3A4E',
        defaultBg: '#2C2C3E',
        defaultColor: '#FFFFFF',
        textHoverBg: 'rgba(255, 255, 255, 0.08)',
        onlyIconSize: 16,
        onlyIconSizeSM: 14,
        onlyIconSizeLG: 18,
        groupBorderColor: '#4FB8FF',
    },

    // 选择器组件
    Select: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextPlaceholder: '#6A6A7A',
        borderRadius: 4,
        optionSelectedBg: 'rgba(79, 184, 255, 0.2)',
        optionSelectedColor: '#4FB8FF',
        optionActiveBg: 'rgba(79, 184, 255, 0.1)',
        optionPadding: '8px 12px',
        selectorBg: '#2C2C3E',
        singleItemHeightLG: 40,
        multipleItemBg: '#3A3A4E',
        multipleItemBorderColor: 'transparent',
        multipleItemColor: '#FFFFFF',
    },

    // 模态框组件
    Modal: {
        borderRadiusLG: 8,
        headerBg: '#2C2C3E',
        colorBgElevated: '#2C2C3E',
        colorTextHeading: '#FFFFFF',
        paddingContentHorizontal: 24,
        paddingContentVertical: 20,
        paddingMD: 16,
        titleFontSize: 18,
        footerPaddingVertical: 16,
        footerPaddingHorizontal: 24,
        headerPadding: '16px 24px',
        contentPadding: 20,
        footerBg: 'transparent',
        footerBorderTop: '1px solid #3A3A4E',
        closeBtnHoverBg: 'rgba(255, 255, 255, 0.1)',
    },

    // 滑动输入条
    Slider: {
        trackBg: '#4FB8FF',
        trackHoverBg: '#6FC8FF',
        handleColor: '#4FB8FF',
        railBg: '#3A3A4E',
        railSize: 4,
        handleSize: 14,
        handleSizeHover: 16,
        handleLineWidth: 2,
        handleLineWidthHover: 2,
        dotSize: 8,
        dotBorderColor: '#3A3A4E',
        dotActiveBorderColor: '#4FB8FF',
        handleActiveColor: '#3CA8DF',
    },

    // 折叠面板
    Collapse: {
        borderRadiusLG: 4,
        colorBorder: '#3A3A4E',
        headerBg: '#2C2C3E',
        contentBg: '#2C2C3E',
        headerPadding: '12px 16px',
        contentPadding: '16px',
        headerArrowColor: '#A0A0B2',
        headerArrowHoverColor: '#4FB8FF',
    },

    // 卡片组件
    Card: {
        colorBgContainer: '#2C2C3E',
        borderRadiusLG: 8,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        colorBorderSecondary: '#3A3A4E',
        padding: 20,
        paddingSM: 16,
        paddingLG: 24,
        headerBg: 'transparent',
        headerBorderBottom: '1px solid #3A3A4E',
        actionsBg: '#2C2C3E',
        actionsLiMargin: '8px 0',
        extraColor: '#A0A0B2',
    },

    // 标签页组件
    Tabs: {
        cardBg: '#2C2C3E',
        itemColor: '#A0A0B2',
        itemSelectedColor: '#4FB8FF',
        inkBarColor: '#4FB8FF',
        horizontalItemGutter: 32,
        horizontalItemPadding: '12px 0',
        horizontalMargin: '0 0 16px 0',
        cardPadding: '8px 16px',
        cardGutter: 4,
        cardHeight: 40,
        titleFontSize: 14,
        titleFontSizeLG: 16,
        itemHoverColor: '#4FB8FF',
        itemActiveColor: '#4FB8FF',
        cardHeadBackground: '#2C2C3E',
    },

    // 分页组件
    Pagination: {
        colorBgContainer: '#2C2C3E',
        colorBgTextHover: 'rgba(255, 255, 255, 0.08)',
        colorBgTextActive: 'rgba(79, 184, 255, 0.2)',
        colorPrimary: '#4FB8FF',
        colorPrimaryHover: '#6FC8FF',
        colorText: '#A0A0B2',
        colorTextDisabled: '#5A5A6E',
        itemBg: '#2C2C3E',
        itemLinkBg: '#2C2C3E',
        itemActiveBg: 'transparent',
        itemActiveColorDisabled: '#5A5A6E',
        itemSize: 32,
        itemSizeSM: 24,
        itemBgActive: 'rgba(79, 184, 255, 0.2)',
    },

    // 表单组件
    Form: {
        labelColor: '#A0A0B2',
        labelFontSize: 14,
        labelHeight: 32,
        labelRequiredMarkColor: '#FF6E6E',
        itemMarginBottom: 24,
        verticalLabelPadding: '0 0 8px',
    },

    // 警告提示
    Alert: {
        colorSuccessBg: 'rgba(60, 237, 146, 0.1)',
        colorSuccessBorder: 'rgba(60, 237, 146, 0.3)',
        colorWarningBg: 'rgba(255, 197, 61, 0.1)',
        colorWarningBorder: 'rgba(255, 197, 61, 0.3)',
        colorErrorBg: 'rgba(255, 110, 110, 0.1)',
        colorErrorBorder: 'rgba(255, 110, 110, 0.3)',
        colorInfoBg: 'rgba(79, 184, 255, 0.1)',
        colorInfoBorder: 'rgba(79, 184, 255, 0.3)',
        padding: 16,
        paddingContentHorizontal: 12,
        borderRadiusLG: 4,
        fontSizeIcon: 16,
        actionMarginInlineStart: 12,
    },

    // 消息通知
    Notification: {
        colorBgElevated: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextHeading: '#FFFFFF',
        colorIcon: '#4FB8FF',
        colorIconHover: '#6FC8FF',
        fontSizeLG: 16,
        padding: 16,
        paddingContentHorizontal: 16,
        marginBottom: 16,
        borderRadiusLG: 8,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    },

    // 工具提示
    Tooltip: {
        colorBgSpotlight: '#2C2C3E',
        colorTextLightSolid: '#FFFFFF',
        borderRadius: 4,
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        paddingSM: 8,
        paddingXS: 4,
        fontSize: 14,
    },

    // 进度条
    Progress: {
        defaultColor: '#4FB8FF',
        colorText: '#A0A0B2',
        remainingColor: '#3A3A4E',
        lineBorderRadius: 4,
        circleTextColor: '#FFFFFF',
        circleTextFontSize: '1em',
    },

    // 开关组件
    Switch: {
        trackHeight: 22,
        trackMinWidth: 44,
        trackPadding: 2,
        colorPrimary: '#3CED92',
        colorPrimaryHover: '#4CFDA2',
        colorBgContainer: '#3A3A4E',
        handleSize: 18,
        handleShadow: '0 2px 4px 0 rgba(0, 35, 11, 0.2)',
        handleBg: '#FFFFFF',
    },

    // 上传组件
    Upload: {
        colorBorder: '#3A3A4E',
        colorText: '#A0A0B2',
        colorTextDisabled: '#5A5A6E',
        borderRadiusLG: 8,
        actionsColor: '#4FB8FF',
    },

    // 树组件
    Tree: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        directoryNodeSelectedBg: 'rgba(79, 184, 255, 0.2)',
        directoryNodeSelectedColor: '#4FB8FF',
        nodeHoverBg: 'rgba(255, 255, 255, 0.08)',
        nodeSelectedBg: 'rgba(79, 184, 255, 0.2)',
        titleHeight: 32,
        nodePadding: 4,
    },

    // 徽标组件
    Badge: {
        colorBgContainer: '#2C2C3E',
        colorBorderBg: '#2C2C3E',
        colorError: '#FF6E6E',
        colorInfo: '#4FB8FF',
        colorSuccess: '#3CED92',
        colorWarning: '#FFC53D',
        textColor: '#FFFFFF',
        fontSize: 12,
        fontSizeSM: 10,
        dotSize: 8,
        statusSize: 8,
    },

    // 分割线
    Divider: {
        colorSplit: '#3A3A4E',
        margin: 16,
        marginLG: 24,
        marginXS: 8,
        textPadding: '0 8px',
        orientationMargin: 0.05,
    },

    // 空状态
    Empty: {
        colorTextDisabled: '#5A5A6E',
        fontSize: 14,
        margin: 24,
        marginLG: 32,
        marginSM: 16,
        imageHeight: 120,
        imageHeightSM: 80,
        imageHeightLG: 160,
    },
};

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
