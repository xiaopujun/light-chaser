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

import React, {memo, useEffect, useRef, useState} from 'react';
import Ruler, {RulerProps} from "@scena/react-ruler";
import eventOperateStore from "../operate-provider/EventOperateStore";
import {IPoint} from "../blueprint/manager/BluePrintManager.ts";
import designerLeftStore from "../left/DesignerLeftStore";

export interface DesignerRulerRef {
    ruleWheel: () => void;
    ruleDrag: () => void;
}

interface DesignerRulerProps {
    offset?: IPoint;
    children?: React.ReactNode;
}

/**
 * 缩放计算公式：
 * 设现有条件：
 * 1) 当前鼠标位置：P
 * 2) 当前缩放倍数：S1
 * 3) 最新缩放倍数：S2
 * 4) 标尺起始位置：St
 * 5) 标尺渲染起始位置：scrollPos
 * 则：scrollPos = P-[(P-St)/(S2/S1)]
 *
 * 鼠标移动计算公式：
 * 设现有条件：
 * 1) 鼠标按下时在当前屏幕分辨路下的真实鼠标位置：mosP
 * 2) 标尺当前的起始位置：startP
 * 3) 鼠标本次移动的距离：mouOffset
 * 4) 标尺当前的缩放系数：scale
 * 5) 在当前缩放系数下，鼠标对应的标尺位置：rulerP
 *
 * 则鼠标指针在当前缩放系数下的位置为：rulerP = startP + (mouOffset / scale)
 * 鼠标移动后的标尺起始位置为：scrollPos = startP + (mouOffset / scale)
 */
const DesignerRuler = memo((props: RulerProps & DesignerRulerProps) => {
    const [, setCount] = useState(0);
    const rulerXRef = useRef<Ruler | null>(null);
    const rulerYRef = useRef<Ruler | null>(null);
    const unitRef = useRef(50);
    const scrollPosRef = useRef<IPoint>({x: 0, y: 0});
    const baseOffsetRef = useRef(20);

    const ruleWheel = () => {
        const {scale} = eventOperateStore;
        const {dsContentRef} = eventOperateStore;
        const {designerLeftRef} = designerLeftStore;
        const {x, y} = dsContentRef?.getBoundingClientRect()!;
        const {width} = designerLeftRef?.getBoundingClientRect()!;
        scrollPosRef.current.x = -(x - width - 20) / scale;
        scrollPosRef.current.y = -(y - 70) / scale;

        unitRef.current = Math.floor(50 / scale);
        setCount(Date.now());
    }

    //todo 数字魔法值要统一公共变量处理
    const ruleDrag = () => {
        const {dsContentRef, scale} = eventOperateStore;
        const {designerLeftRef} = designerLeftStore;
        const {x, y} = dsContentRef?.getBoundingClientRect()!;
        const {width} = designerLeftRef?.getBoundingClientRect()!;
        scrollPosRef.current.x = -(x - width - 20) / scale;
        scrollPosRef.current.y = -(y - 70) / scale;
        rulerXRef.current && rulerXRef.current.scroll(scrollPosRef.current.x);
        rulerYRef.current && rulerYRef.current.scroll(scrollPosRef.current.y);
    }

    useEffect(() => {
        const {setRuleRef} = eventOperateStore;
        setRuleRef({ruleWheel, ruleDrag});
        return () => {
            setRuleRef(null);
        }
    }, []);

    const {scale} = eventOperateStore;

    return (
        <div className={'lc-ruler'} style={{position: 'relative'}}>
            <div style={{
                position: 'absolute',
                width: 20,
                height: 20,
                color: '#838383',
                textAlign: 'center',
                fontSize: 12,
                top: -1
            }}>px
            </div>
            <div className={'lc-ruler-horizontal'}
                 style={{
                     height: baseOffsetRef.current,
                     width: `calc(100% - ${baseOffsetRef.current}px)`,
                     position: 'relative',
                     left: baseOffsetRef.current
                 }}>
                <Ruler ref={rulerXRef}
                       scrollPos={scrollPosRef.current.x}
                       zoom={scale}
                       lineColor={'#444b4d'}
                       textColor={'#a6a6a6'}
                       segment={2}
                       negativeRuler={true}
                       textOffset={[0, 10]}
                       backgroundColor={'#1f1f1f'}
                       unit={unitRef.current}/>
            </div>
            <div className={'lc-ruler-vertical'}
                 style={{
                     width: baseOffsetRef.current,
                     height: window.innerHeight - baseOffsetRef.current - 90,
                     position: 'relative',
                     overflow: 'hidden'
                 }}>
                <Ruler ref={rulerYRef}
                       type={'vertical'}
                       scrollPos={scrollPosRef.current.y}
                       lineColor={'#444b4d'}
                       textColor={'#a6a6a6'}
                       zoom={scale}
                       segment={2}
                       negativeRuler={true}
                       textOffset={[10, 0]}
                       backgroundColor={'#1f1f1f'}
                       unit={unitRef.current}/>
            </div>
            <div className={'lc-ruler-content'} style={{
                position: 'absolute',
                overflow: 'hidden',
                top: baseOffsetRef.current,
                left: baseOffsetRef.current,
            }}>
                {props.children}
            </div>
        </div>
    );
})

export default DesignerRuler;