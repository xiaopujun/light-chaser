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

import {memo} from "react";
import './TemplateMarket.less';

const TemplateMarket = memo(() => {
    return (
        <div className="template-market">
            <div className="template-market-card">
                <div className="template-market-kicker">Template Market</div>
                <h1 className="template-market-title">开发中...</h1>
                <p className="template-market-copy">
                    这里将承载模板浏览、筛选和一键应用能力，视觉上先保持和首页一致的卡片风格。
                </p>
            </div>
        </div>
    );
})

export default TemplateMarket
