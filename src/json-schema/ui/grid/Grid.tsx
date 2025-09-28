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
import './Grid.less';
import {UIContainer, UIContainerProps} from "../ui-container/UIContainer";

export interface GridProps extends UIContainerProps {
    children?: React.ReactNode;
    columns?: number;
    gridGap?: string;
}

export const Grid: React.FC<GridProps> = (props) => {
    const {children, columns = 1, gridGap, ...containerProp} = props;
    const gtc = `repeat(${columns}, 1fr)`;
    const gridStyle = {gridTemplateColumns: gtc, gridGap}
    return (
        <UIContainer {...containerProp} className={'lc-grid'}>
            <div style={gridStyle} className={'lc-grid-layout'}>{children}</div>
        </UIContainer>
    )
}
