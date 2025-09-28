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
import './BPFooter.less';
import bluePrintManager from "../manager/BluePrintManager.ts";
import {observer} from "mobx-react";

const BPFooter: React.FC = observer(() => {
    const {canvasScale} = bluePrintManager;
    return (
        <div className={'bp-footer'}>
      <div className={'bp-footer-scale'}>
        <span className={'bp-footer-label'}>画布缩放：</span>
        <span className={'bp-footer-value'}>{(canvasScale * 100).toFixed(0)}%</span>
      </div>
        </div>
    )
})

export default BPFooter;
