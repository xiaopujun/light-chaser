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

import {useEffect} from 'react';
import {HotKeyConfigType} from "./HotKeyType.ts";
import hotkeys from 'hotkeys-js';

interface HotKeyProps {
    handlerMapping: HotKeyConfigType;
}

export default function HotKey(props: HotKeyProps) {
    useEffect(() => {
        const hotKeyConfig = props.handlerMapping ?? {}
        Object.keys(hotKeyConfig).forEach((key) => {
            const {handler} = hotKeyConfig[key];
            hotkeys(key, function (_event: KeyboardEvent) {
                const target = _event.target as HTMLElement;
                const tagName = target?.tagName?.toLowerCase();
                // 如果当前焦点在输入框/文本域/可编辑区域 -> 交给浏览器原生处理
                if (tagName === "input" || tagName === "textarea" || target?.isContentEditable)
                    return true; // 交还给浏览器

                if (handler instanceof Array) {
                    handler.forEach((fn: any) => {
                        if (typeof fn === "function")
                            fn();
                    });
                } else if (typeof handler === "function") {
                    handler();
                }
                return false;
            });
        })

        return () => {
            //卸载所有快捷键
            Object.keys(hotKeyConfig).forEach(key => hotkeys.unbind(key))
        }
    }, []);

    return null;
}