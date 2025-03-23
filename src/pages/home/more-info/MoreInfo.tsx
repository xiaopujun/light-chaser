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

import './MoreInfo.less';

export default function MoreInfo() {
    return (
        <div className={'more-info-list'}>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://www.bilibili.com/video/BV1z1421m7v2/?share_source=copy_web&vd_source=ece0559aa5b8c4f5c0d7307cb2b06aac')}>视频教程
            </div>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://xiaopujun.github.io/light-chaser-doc/#/')}>使用文档
            </div>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://github.com/xiaopujun/light-chaser')}>GitHub
            </div>
            <div className={'more-info-item'}
                 onClick={() => window.open('https://gitee.com/xiaopujun/light-chaser')}>Gitee
            </div>
        </div>
    );
}