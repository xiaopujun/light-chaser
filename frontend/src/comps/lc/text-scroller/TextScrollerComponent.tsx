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

import React, {ForwardedRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import './TextScrollerComponent.less';
import debounce from "lodash/debounce";

export interface TextScrollerComponentStyle {
    speed?: number;
    fontSize?: number;
    color?: string;
    fontFamily?: string;
    fontWeight?: number;
}

export interface TextScrollerComponentProps extends ComponentBaseProps {
    style?: TextScrollerComponentStyle;
}

export interface TextScrollerComponentRef {
    updateConfig: (newConfig: TextScrollerComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const TextScrollerComponent = React.forwardRef((props: TextScrollerComponentProps,
                                                ref: ForwardedRef<TextScrollerComponentRef>) => {
    const [config, setConfig] = useState<TextScrollerComponentProps>({...props});
    const {speed, ...rest} = config.style!;

    const eventHandlerMap = useRef<Record<string, Function>>({});
    const textScrollerRef = useRef<HTMLDivElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    useEffect(() => {
        if (textContainerRef.current) {
            resizeObserverRef.current = new ResizeObserver(debounce((entries) => {
                for (const entry of entries) {
                    const {width} = entry.contentRect;
                    textContainerRef.current!.style.setProperty('--container-width', `${width}px`);
                }
            }, 100));
            // 开始观察
            resizeObserverRef.current!.observe(textContainerRef.current);
        }
    }, []);
    useEffect(() => {
        textContainerRef.current?.style.setProperty('--speed', `${speed || 5}s`)
    }, [config]);


    return (
        <div className="text-scroller-container" ref={textContainerRef}>
            <div className="text-scroller" style={{...rest}} ref={textScrollerRef}>
                {config?.data?.staticData}
            </div>
        </div>
    );
});

export default TextScrollerComponent;