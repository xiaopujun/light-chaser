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

import {useEffect, useRef} from 'react';
import eventOperateStore from "../EventOperateStore";
import {HotKeyConfigType, HotKeyTriggerType} from "./HotKeyType.ts";

//需要屏蔽浏览器默认快捷键效果的快捷键列表
const shieldKeyList = [
    'alt',
    'tab',
    'control + s',
    'control + l',
    'control + shift + l',
    'control + h',
    'control + f',
    'control + k',
    'control + 1',
    'control + 2',
    'control + 3',
    'control + 4',
    'control + 5',
    'control + g',
    'control + d',
    'control + shift + g',
]

interface HotKeyProps {
    handlerMapping: HotKeyConfigType;
}

export default function HotKey(props: HotKeyProps) {
    const handlerMappingRef = useRef<HotKeyConfigType>(props.handlerMapping ?? {});
    const currHotKeyRef = useRef<string[]>([]);
    const specialDomCacheRef = useRef<Record<string, HTMLElement>>({});

    const getSpecialDomCache = (classSelector: string) => {
        //先从缓存中获取dom元素，如果没有则从document中获取并缓存
        const specialDom = specialDomCacheRef.current[classSelector];
        if (specialDom)
            return specialDom;
        else {
            const specialDom = document.querySelector(classSelector);
            if (!specialDom)
                return null;
            specialDomCacheRef.current[classSelector] = specialDom as HTMLElement;
            return specialDom;
        }
    }

    /**
     * 从快捷键配置管理映射表中匹配对应的快捷键处理函数并执行。
     * @param e 鼠标事件对象
     * @param hotKey 当前按下的快捷键
     */
    const doHandler = (e: KeyboardEvent, hotKey: string) => {
        const {handler, triggerType = HotKeyTriggerType.SINGLE, range} = handlerMappingRef.current[hotKey] || {};
        if (!handler)
            return;
        if (triggerType === HotKeyTriggerType.SINGLE || triggerType === HotKeyTriggerType.COILED) {
            const {pointerTarget} = eventOperateStore;
            //如果设定了指定范围并且不在范围内则不执行
            if (range) {
                //先从缓存中获取dom元素，如果没有则从document中获取并缓存
                const targetDom = getSpecialDomCache(range);
                if (!targetDom || !targetDom.contains(pointerTarget as Node))
                    return;
            }
            //其余情况均执行快捷键，如果是数组则遍历执行，反之直接执行
            if (Array.isArray(handler))
                handler.forEach(func => func(e));
            else
                handler(e);
        }
    }

    const keyDown = (e: KeyboardEvent) => {
        const key = e.key?.toLowerCase();
        if (!key)
            return;
        if (!currHotKeyRef.current.some(item => item === key))
            currHotKeyRef.current.push(key);
        const hotKey = currHotKeyRef.current.join(' + ');
        if (shieldKeyList.some(item => item === hotKey))
            e.preventDefault();
        doHandler(e, hotKey);
    };

    const keyUp = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        if (currHotKeyRef.current.some(item => item === key))
            currHotKeyRef.current = currHotKeyRef.current.filter(item => item !== key);
    }

    useEffect(() => {
        document.addEventListener('keydown', keyDown);
        document.addEventListener('keyup', keyUp);
        document.onvisibilitychange = () => {
            if (document.visibilityState === "visible")
                currHotKeyRef.current = [];
        };
        window.onfocus = () => currHotKeyRef.current = [];

        return () => {
            document.removeEventListener('keydown', keyDown);
            document.removeEventListener('keyup', keyUp);
            document.onvisibilitychange = null;
            window.onfocus = null;
        }
    }, []);

    return null;
}