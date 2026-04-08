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

import React, {ReactNode} from "react";
import './FrameLayout.less';

export interface FrameLayoutProps {
    header?: ReactNode;
    footer?: ReactNode;
    left?: ReactNode;
    right?: ReactNode;
    content?: ReactNode;
}

const FrameLayout: React.FC<FrameLayoutProps> = (props) => {
    const {header, footer, left, right, content} = props;
    return (
        <div className={'frame-layout'}>
            <div className={'fl-header'}>{header}</div>
            <div className={'fl-body'}>
                <div className={'fl-left'}>{left}</div>
                <div className={'fl-crf-box'}>
                    <div className={'fl-cr-box'}>
                        <div className={'fl-content'}>{content}</div>
                        <div className={'fl-right'}>{right}</div>
                    </div>
                    <div className={'fl-footer'}>{footer}</div>
                </div>
            </div>
        </div>
    )
}

export default FrameLayout;