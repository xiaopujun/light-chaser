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

import './FourAngleGloeBorder.less';
import {ForwardedRef, forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {FourAngleGlowProps} from "./FourAngleGlowBorderController";

export interface FourAngleGlowBorderStyle {
    width?: number;
    length?: number;
    color?: string;
    radius?: number;
}

export interface FourAngleGlowBorderRef {
    updateConfig: (config: FourAngleGlowBorderStyle) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const FourAngleGlowBorder = forwardRef((props: FourAngleGlowProps, ref: ForwardedRef<FourAngleGlowBorderRef>) => {
    const [config] = useState<FourAngleGlowProps>({...props});
    const fourAngleGlowRef = useRef<HTMLDivElement | null>(null);
    const eventHandlerMap = useRef<Record<string, Function>>({});


    const updateStyle = (config: FourAngleGlowBorderStyle) => {
        fourAngleGlowRef.current?.style.setProperty('--fagb-length', `${config?.length}px`);
        fourAngleGlowRef.current?.style.setProperty('--fagb-color', config!.color!);
        fourAngleGlowRef.current?.style.setProperty('--fagb-radius', `${config?.radius}px`);
        fourAngleGlowRef.current?.style.setProperty('--fagb-width', `${config?.width}px`);
    }

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => updateStyle({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    useEffect(() => {
        updateStyle(config.style!);
    });

    return (
        <div className="four-angle-glow" ref={fourAngleGlowRef}>
            <span className="angle angle-tl"/>
            <span className="angle angle-tr"/>
            <span className="angle angle-bl"/>
            <span className="angle angle-br"/>
        </div>
    );
})

export default FourAngleGlowBorder;


