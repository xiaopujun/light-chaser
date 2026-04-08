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

import React from "react";
import './UIContainer.less';
import {Tooltip} from "antd";
import {Help} from "@icon-park/react";

export interface UIContainerProps {
    label?: string;
    tip?: string;
    className?: string;
    containerStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    children?: React.ReactNode;
}

export const UIContainer: React.FC<UIContainerProps> = (props) => {
    const {label, tip, children, className, containerStyle, contentStyle, labelStyle} = props;
    return (
        <div className={`ui-container ${className || ''}`} style={{...containerStyle}}>
            {label &&
                <div className={'ui-container-label'} style={{...labelStyle}}>
                    <div>{label}</div>
                    {tip && <div className={'ui-container-tip'}>
                        <Tooltip title={tip} style={{marginLeft: 1}}><Help/></Tooltip></div>}
                </div>}
            <div className={'ui-container-content'} style={{...contentStyle}}>{children}</div>
        </div>
    )
}
