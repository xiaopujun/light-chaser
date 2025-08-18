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
import {MappingAlgorithm, theme} from "antd";

export const studioDarkAlgorithm: MappingAlgorithm = (seedToken, mapToken) => {
    const baseToken = theme.darkAlgorithm(seedToken, mapToken);
    return {
        ...baseToken,
        // 核心色彩系统保持不变
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

        // 尺寸系统调整为小号
        borderRadius: 3,  // 从4调整为3
        borderRadiusSM: 1,  // 从2调整为1
        borderRadiusLG: 6,  // 从8调整为6
        borderRadiusXS: 1,  // 从2调整为1

        // 字体系统保持不变
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

        // 间距系统调整为小号
        padding: 12,  // 从16调整为12
        paddingSM: 8,  // 从12调整为8
        paddingXS: 6,  // 从8调整为6
        paddingXXS: 2,  // 从4调整为2
        margin: 12,  // 从16调整为12
        marginSM: 8,  // 从12调整为8
        marginXS: 6,  // 从8调整为6
        marginXXS: 2,  // 从4调整为2
        controlHeight: 28,  // 从32调整为28
        controlHeightSM: 20, // 从24调整为20
        controlHeightLG: 36, // 从40调整为36
    };
};

export const antdComponentTheme = {
    // 全局覆盖配置保持不变
    common: {
        motionDurationMid: '0.2s',
        motionDurationFast: '0.1s',
        motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    },

    // 菜单组件调整为小号
    Menu: {
        itemColor: '#A0A0B2',
        itemHoverColor: '#4FB8FF',
        itemSelectedColor: '#4FB8FF',
        itemSelectedBg: 'rgba(79, 184, 255, 0.2)',
        itemBg: 'transparent',
        itemBorderRadius: 3,  // 从4调整为3
        itemMarginBlock: 2,  // 从4调整为2
        itemMarginInline: 6,  // 从8调整为6
        activeBarWidth: 2,  // 从3调整为2
        itemPaddingInline: 10,  // 从12调整为10
        horizontalItemHoverBg: 'transparent',
        horizontalItemSelectedBg: 'transparent',
    },

    // 表格组件调整为小号
    Table: {
        headerBg: '#2C2C3E',
        headerColor: '#FFFFFF',
        headerBorderRadius: 3,  // 从4调整为3
        colorBgContainer: '#2C2C3E',
        cellPaddingBlock: 8,  // 从12调整为8
        cellPaddingInline: 12,  // 从16调整为12
        borderColor: '#3A3A4E',
        rowHoverBg: 'rgba(79, 184, 255, 0.1)',
        rowSelectedBg: 'rgba(79, 184, 255, 0.15)',
        rowSelectedHoverBg: 'rgba(79, 184, 255, 0.2)',
        footerBg: '#2C2C3E',
        footerColor: '#A0A0B2',
        headerSplitColor: 'transparent',
        fixedHeaderSortActiveBg: '#3A3A4E',
    },

    // 输入框组件调整为小号
    Input: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextPlaceholder: '#6A6A7A',
        borderRadius: 3,  // 从4调整为3
        hoverBorderColor: '#4FB8FF',
        activeBorderColor: '#4FB8FF',
        activeShadow: '0 0 0 2px rgba(79, 184, 255, 0.2)',
        paddingInline: 10,  // 从12调整为10
        paddingInlineSM: 6,  // 从8调整为6
        paddingBlock: 6,  // 从8调整为6
        paddingBlockSM: 2,  // 从4调整为2
        addonBg: '#3A3A4E',
    },

    // 按钮组件调整为小号
    Button: {
        borderRadius: 3,  // 从4调整为3
        colorPrimary: '#4FB8FF',
        colorPrimaryHover: '#6FC8FF',
        colorPrimaryActive: '#3CA8DF',
        colorText: '#FFFFFF',
        colorTextDisabled: '#5A5A6E',
        colorBgContainerDisabled: '#3A3A4E',
        controlHeight: 28,  // 从32调整为28
        controlHeightSM: 20,  // 从24调整为20
        controlHeightLG: 36,  // 从40调整为36
        paddingContentHorizontal: 12,  // 从16调整为12
        paddingContentHorizontalSM: 8,  // 从12调整为8
        paddingContentHorizontalLG: 16,  // 从20调整为16
        defaultBorderColor: '#3A3A4E',
        defaultBg: '#2C2C3E',
        defaultColor: '#FFFFFF',
        textHoverBg: 'rgba(255, 255, 255, 0.08)',
        onlyIconSize: 14,  // 从16调整为14
        onlyIconSizeSM: 12,  // 从14调整为12
        onlyIconSizeLG: 16,  // 从18调整为16
        groupBorderColor: '#4FB8FF',
    },

    // 选择器组件调整为小号
    Select: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextPlaceholder: '#6A6A7A',
        borderRadius: 3,  // 从4调整为3
        optionSelectedBg: 'rgba(79, 184, 255, 0.2)',
        optionSelectedColor: '#4FB8FF',
        optionActiveBg: 'rgba(79, 184, 255, 0.1)',
        optionPadding: '6px 10px',  // 从8px 12px调整为6px 10px
        selectorBg: '#2C2C3E',
        singleItemHeightLG: 36,  // 从40调整为36
        multipleItemBg: '#3A3A4E',
        multipleItemBorderColor: 'transparent',
        multipleItemColor: '#FFFFFF',
    },

    // 模态框组件调整为小号
    Modal: {
        borderRadiusLG: 6,  // 从8调整为6
        headerBg: '#2C2C3E',
        colorBgElevated: '#2C2C3E',
        colorTextHeading: '#FFFFFF',
        paddingContentHorizontal: 20,  // 从24调整为20
        paddingContentVertical: 16,  // 从20调整为16
        paddingMD: 12,  // 从16调整为12
        titleFontSize: 16,  // 从18调整为16
        footerPaddingVertical: 12,  // 从16调整为12
        footerPaddingHorizontal: 20,  // 从24调整为20
        headerPadding: '12px 20px',  // 从16px 24px调整为12px 20px
        contentPadding: 16,  // 从20调整为16
        footerBg: 'transparent',
        footerBorderTop: '1px solid #3A3A4E',
        closeBtnHoverBg: 'rgba(255, 255, 255, 0.1)',
    },

    // 滑动输入条调整为小号
    Slider: {
        trackBg: '#4FB8FF',
        trackHoverBg: '#6FC8FF',
        handleColor: '#4FB8FF',
        railBg: '#3A3A4E',
        railSize: 3,  // 从4调整为3
        handleSize: 12,  // 从14调整为12
        handleSizeHover: 14,  // 从16调整为14
        handleLineWidth: 2,
        handleLineWidthHover: 2,
        dotSize: 6,  // 从8调整为6
        dotBorderColor: '#3A3A4E',
        dotActiveBorderColor: '#4FB8FF',
        handleActiveColor: '#3CA8DF',
    },

    // 折叠面板调整为小号
    Collapse: {
        borderRadiusLG: 3,  // 从4调整为3
        colorBorder: '#3A3A4E',
        headerBg: '#2C2C3E',
        contentBg: '#2C2C3E',
        headerPadding: '8px 12px',  // 从12px 16px调整为8px 12px
        contentPadding: '12px',  // 从16px调整为12px
        headerArrowColor: '#A0A0B2',
        headerArrowHoverColor: '#4FB8FF',
    },

    // 卡片组件调整为小号
    Card: {
        colorBgContainer: '#2C2C3E',
        borderRadiusLG: 6,  // 从8调整为6
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
        colorBorderSecondary: '#3A3A4E',
        padding: 16,  // 从20调整为16
        paddingSM: 12,  // 从16调整为12
        paddingLG: 20,  // 从24调整为20
        headerBg: 'transparent',
        headerBorderBottom: '1px solid #3A3A4E',
        actionsBg: '#2C2C3E',
        actionsLiMargin: '6px 0',  // 从8px 0调整为6px 0
        extraColor: '#A0A0B2',
    },

    // 标签页组件调整为小号
    Tabs: {
        cardBg: '#2C2C3E',
        itemColor: '#A0A0B2',
        itemSelectedColor: '#4FB8FF',
        inkBarColor: '#4FB8FF',
        horizontalItemGutter: 24,  // 从32调整为24
        horizontalItemPadding: '8px 0',  // 从12px 0调整为8px 0
        horizontalMargin: '0 0 12px 0',  // 从0 0 16px 0调整为0 0 12px 0
        cardPadding: '6px 12px',  // 从8px 16px调整为6px 12px
        cardGutter: 3,  // 从4调整为3
        cardHeight: 36,  // 从40调整为36
        titleFontSize: 14,
        titleFontSizeLG: 16,
        itemHoverColor: '#4FB8FF',
        itemActiveColor: '#4FB8FF',
        cardHeadBackground: '#2C2C3E',
    },

    // 分页组件调整为小号
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
        itemSize: 28,  // 从32调整为28
        itemSizeSM: 20,  // 从24调整为20
        itemBgActive: 'rgba(79, 184, 255, 0.2)',
    },

    // 表单组件调整为小号
    Form: {
        labelColor: '#A0A0B2',
        labelFontSize: 14,
        labelHeight: 28,  // 从32调整为28
        labelRequiredMarkColor: '#FF6E6E',
        itemMarginBottom: 20,  // 从24调整为20
        verticalLabelPadding: '0 0 6px',  // 从0 0 8px调整为0 0 6px
    },

    // 警告提示调整为小号
    Alert: {
        colorSuccessBg: 'rgba(60, 237, 146, 0.1)',
        colorSuccessBorder: 'rgba(60, 237, 146, 0.3)',
        colorWarningBg: 'rgba(255, 197, 61, 0.1)',
        colorWarningBorder: 'rgba(255, 197, 61, 0.3)',
        colorErrorBg: 'rgba(255, 110, 110, 0.1)',
        colorErrorBorder: 'rgba(255, 110, 110, 0.3)',
        colorInfoBg: 'rgba(79, 184, 255, 0.1)',
        colorInfoBorder: 'rgba(79, 184, 255, 0.3)',
        padding: 12,  // 从16调整为12
        paddingContentHorizontal: 10,  // 从12调整为10
        borderRadiusLG: 3,  // 从4调整为3
        fontSizeIcon: 14,  // 从16调整为14
        actionMarginInlineStart: 10,  // 从12调整为10
    },

    // 消息通知调整为小号
    Notification: {
        colorBgElevated: '#3A3A4E',
        colorText: '#FFFFFF',
        colorTextHeading: '#FFFFFF',
        colorIcon: '#4FB8FF',
        colorIconHover: '#6FC8FF',
        fontSizeLG: 16,
        padding: 12,  // 从16调整为12
        paddingContentHorizontal: 12,  // 从16调整为12
        marginBottom: 12,  // 从16调整为12
        borderRadiusLG: 6,  // 从8调整为6
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    },

    // 工具提示调整为小号
    Tooltip: {
        colorBgSpotlight: '#2C2C3E',
        colorTextLightSolid: '#FFFFFF',
        borderRadius: 3,  // 从4调整为3
        boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        paddingSM: 6,  // 从8调整为6
        paddingXS: 2,  // 从4调整为2
        fontSize: 14,
    },

    // 进度条调整为小号
    Progress: {
        defaultColor: '#4FB8FF',
        colorText: '#A0A0B2',
        remainingColor: '#3A3A4E',
        lineBorderRadius: 3,  // 从4调整为3
        circleTextColor: '#FFFFFF',
        circleTextFontSize: '1em',
    },

    // 开关组件调整为小号
    Switch: {
        trackHeight: 18,  // 从22调整为18
        trackMinWidth: 36,  // 从44调整为36
        trackPadding: 1,  // 从2调整为1
        colorPrimary: '#3CED92',
        colorPrimaryHover: '#4CFDA2',
        colorBgContainer: '#3A3A4E',
        handleSize: 14,  // 从18调整为14
        handleShadow: '0 2px 4px 0 rgba(0, 35, 11, 0.2)',
        handleBg: '#FFFFFF',
    },

    // 上传组件调整为小号
    Upload: {
        colorBorder: '#3A3A4E',
        colorText: '#A0A0B2',
        colorTextDisabled: '#5A5A6E',
        borderRadiusLG: 6,  // 从8调整为6
        actionsColor: '#4FB8FF',
    },

    // 树组件调整为小号
    Tree: {
        colorBgContainer: '#2C2C3E',
        colorBorder: '#3A3A4E',
        directoryNodeSelectedBg: 'rgba(79, 184, 255, 0.2)',
        directoryNodeSelectedColor: '#4FB8FF',
        nodeHoverBg: 'rgba(255, 255, 255, 0.08)',
        nodeSelectedBg: 'rgba(79, 184, 255, 0.2)',
        titleHeight: 28,  // 从32调整为28
        nodePadding: 2,  // 从4调整为2
    },

    // 徽标组件调整为小号
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
        dotSize: 6,  // 从8调整为6
        statusSize: 6,  // 从8调整为6
    },

    // 分割线调整为小号
    Divider: {
        colorSplit: '#3A3A4E',
        margin: 12,  // 从16调整为12
        marginLG: 20,  // 从24调整为20
        marginXS: 6,  // 从8调整为6
        textPadding: '0 6px',  // 从0 8px调整为0 6px
        orientationMargin: 0.05,
    },

    // 空状态调整为小号
    Empty: {
        colorTextDisabled: '#5A5A6E',
        fontSize: 14,
        margin: 20,  // 从24调整为20
        marginLG: 28,  // 从32调整为28
        marginSM: 12,  // 从16调整为12
        imageHeight: 100,  // 从120调整为100
        imageHeightSM: 60,  // 从80调整为60
        imageHeightLG: 140,  // 从160调整为140
    },
};