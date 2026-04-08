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

import React, {ForwardedRef, useImperativeHandle, useRef, useState} from 'react';
import {ComponentBaseProps} from "../../common-component/CommonTypes.ts";
import {Carousel} from "antd";
import './CarouselComponent.less';
import defaultData from './carousel.png';

export interface CarouselComponentStyle {
    //自动播放
    autoplay?: boolean;
    //自动播放速度
    autoplaySpeed?: number;
    //显示按钮
    dots?: boolean;
    //渐变切换
    fade?: boolean;
    //切换动效时间
    speed?: number;
}

export interface CarouselComponentProps extends ComponentBaseProps {
    style?: CarouselComponentStyle;
}

export interface CarouselComponentRef {
    updateConfig: (newConfig: CarouselComponentProps) => void;
    setEventHandler: (eventMap: Record<string, Function>) => void;
}

const CarouselComponent = React.forwardRef((props: CarouselComponentProps,
                                            ref: ForwardedRef<CarouselComponentRef>) => {
    const [config, setConfig] = useState<CarouselComponentProps>({...props});

    const eventHandlerMap = useRef<Record<string, Function>>({});

    useImperativeHandle(ref, () => ({
        updateConfig: (newConfig) => setConfig({...newConfig}),
        setEventHandler: (eventMap) => eventHandlerMap.current = eventMap,
    }));

    // const onClick = () => {
    //     if ('click' in eventHandlerMap.current) {
    //         eventHandlerMap.current['click']();
    //     }
    // }
    const data = config?.data?.staticData || [defaultData, defaultData]
    return (
        <div style={{width: '100%', height: '100%', overflow: 'hidden'}} className={'antd-carousel'}>
            <Carousel {...config.style}>
                {
                    data.map((src: string, index: number) => {
                        return (
                            <div key={index}><img alt={'轮播图' + index} src={src}/></div>
                        )
                    })
                }
            </Carousel>
        </div>
    );
});

export default CarouselComponent;