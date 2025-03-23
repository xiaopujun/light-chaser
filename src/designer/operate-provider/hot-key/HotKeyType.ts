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

export enum HotKeyTriggerType {
    //单次触发
    SINGLE,
    //连续触发
    COILED
}

export interface HotKeyConfigType {
    [key: string]: {
        //快捷键处理函数
        handler: Function | Function[],
        //快捷键生效范围，布设置（默认）所有范围内可用。值为css选择器
        range?: string,
        //快捷键触发类型
        triggerType?: HotKeyTriggerType
    }
}