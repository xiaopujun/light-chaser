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
import BpCanvasUtil, {bpLineConfig} from "../util/BpCanvasUtil.ts";
import {Application, Graphics} from "pixi.js";
import {cloneDeep} from "lodash";
import bluePrintManager, {IBPLine} from "../manager/BluePrintManager.ts";
import {AnchorPointType} from "../node/core/AbstractBPNodeController.ts";
import IdGenerate from "../../../utils/IdGenerate.ts";


export default function LineLayer() {

    const bpLineContainerRef = useRef<HTMLDivElement | null>(null);
    const keyDownRef = useRef(false);
    const keyMoveRef = useRef(false);
    const width = window.innerWidth - 670, height = window.innerHeight - 85;
    const dragLineRef = useRef<Graphics>();

    const currentLineRef = useRef<IBPLine>({
        color: bpLineConfig.lineColor,
        lineWidth: bpLineConfig.lineWidth,
        startPoint: {x: 0, y: 0},
        endPoint: {x: 0, y: 0},
        firstCP: {x: 0, y: 0},
        secondCP: {x: 0, y: 0},
    });

    const bpMouseDown = (e: MouseEvent) => {
        if (bluePrintManager.selectedLines && bluePrintManager.selectedLines.length > 0) {
            bluePrintManager.selectedLines.forEach(lineId => {
                const graphics = bluePrintManager.lineInstances[lineId!];
                const currentLine = bluePrintManager.bpLines[lineId!]!;
                BpCanvasUtil.reDrawLine(currentLine, graphics);
            })
            bluePrintManager.setSelectedLines([]);
        }
        const {target} = e;
        if (!target || !(target as HTMLElement).classList.contains('ap-circle'))
            return;
        const pointDom = target as HTMLElement;
        const pointInfoArr = pointDom.id.split(":");
        if (pointInfoArr && pointInfoArr.length === 3 && pointInfoArr[2] === AnchorPointType.INPUT.toString())
            return;
        const {canvasOffset} = bluePrintManager;
        //设置起始点坐标
        const {x, y, width, height} = pointDom.getBoundingClientRect();
        console.log('point info:', x, width, pointDom)
        currentLineRef.current.startPoint = {x: x + width / 2 - canvasOffset.x, y: y + height / 2 - canvasOffset.y}
        currentLineRef.current.startAnchorId = pointDom.id;
        keyDownRef.current = true;
    }

    const bpMouseMove = (e: MouseEvent) => {
        if (!keyDownRef.current)
            return;
        keyMoveRef.current = true;
        const {startPoint, endPoint} = currentLineRef.current;
        const {canvasOffset} = bluePrintManager;
        //设置鼠标坐标
        currentLineRef.current.endPoint = {x: e.clientX - canvasOffset.x, y: e.clientY - canvasOffset.y};

        const contPoi = BpCanvasUtil.calculateControlPoint(startPoint!, endPoint!);
        currentLineRef.current.firstCP = contPoi.firstCP;
        currentLineRef.current.secondCP = contPoi.secondCP;
        currentLineRef.current.color = bpLineConfig.connectingColor;
        currentLineRef.current.lineWidth = bpLineConfig.connectingWidth;
        BpCanvasUtil.reDrawLine(currentLineRef.current, dragLineRef.current!)
    }

    const bpMouseUp = (e: MouseEvent) => {
        const endElem = e.target as HTMLElement;
        if (!keyMoveRef.current || !keyDownRef.current || !endElem || !endElem.classList.contains('ap-circle')
            || endElem.id?.split(":")[2] !== AnchorPointType.INPUT.toString()) {
            //清空画布
            dragLineRef.current?.clear();
            keyDownRef.current = false;
            return;
        }
        const {canvasOffset, addAPMap, addLine, addAPLineMap} = bluePrintManager;
        keyDownRef.current = false;
        //清空临时拖拽线
        dragLineRef.current?.clear();

        currentLineRef.current.id = IdGenerate.generateId();
        currentLineRef.current.lineWidth = bpLineConfig.lineWidth;
        currentLineRef.current.color = bpLineConfig.lineColor;
        currentLineRef.current.endAnchorId = (e!.target as HTMLElement).id;
        const {x, y, width: apw, height: aph} = (e.target as HTMLElement)?.getBoundingClientRect() ?? {};
        currentLineRef.current.endPoint = {x: x + apw / 2 - canvasOffset.x, y: y + aph / 2 - canvasOffset.y};

        const copyLine = cloneDeep(currentLineRef.current);
        BpCanvasUtil.createLine(copyLine);
        addLine(copyLine);

        addAPMap(currentLineRef.current.startAnchorId!, currentLineRef.current.endAnchorId);
        //添加锚点与线条的关联关系
        addAPLineMap(currentLineRef.current.startAnchorId!, currentLineRef.current.id!);
        addAPLineMap(currentLineRef.current.endAnchorId!, currentLineRef.current.id!);
    }

    useEffect(() => {
        bluePrintManager.pixiApp = new Application();
        if (!bluePrintManager.pixiApp) {
            console.warn('pixi app create failed');
            return;
        }
        bluePrintManager.pixiApp.init({
            width,
            height,
            antialias: true,
            backgroundAlpha: 0,
            resolution: window.devicePixelRatio,
            preference: 'webgpu'
        }).then(() => {
            bluePrintManager.pixiApp!.stage.interactive = true;
            BpCanvasUtil.reRenderAllLine();
            if (!bluePrintManager.pixiApp?.canvas)
                return;
            bpLineContainerRef.current?.appendChild(bluePrintManager.pixiApp.canvas);
            document.addEventListener('mousedown', bpMouseDown);
            document.addEventListener('mouseup', bpMouseUp);
            document.addEventListener('mousemove', bpMouseMove);
            const tempLine = new Graphics();
            bluePrintManager.pixiApp!.stage.addChild(tempLine);
            dragLineRef.current = tempLine;

        })

        return () => {
            if (bluePrintManager.pixiApp) {
                document.removeEventListener('mousedown', bpMouseDown);
                document.removeEventListener('mouseup', bpMouseUp);
                document.removeEventListener('mousemove', bpMouseMove);
                try {
                    bluePrintManager.pixiApp?.destroy();
                    bluePrintManager.pixiApp = null;
                } catch (e) {
                    console.error('Failed to terminate the pixi instance ', e);
                }
            }
        }
    })


    return (
        <div style={{position: 'absolute'}} ref={bpLineContainerRef}/>
    )
}

