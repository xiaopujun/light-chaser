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

    // 新增：存储当前悬停的目标锚点信息
    const hoverAnchorRef = useRef<{ element: HTMLElement | null; id: string | null }>({
        element: null,
        id: null
    });

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
        const mouseX = e.clientX - canvasOffset.x;
        const mouseY = e.clientY - canvasOffset.y;

        // 新增：检测附近的锚点并自动吸附
        const {targetAnchor, targetElement} = findNearbyAnchor(mouseX, mouseY, 10); // 10像素吸附范围

        if (targetAnchor && targetElement) {
            // 如果找到附近的锚点，使用锚点中心坐标
            const rect = (targetElement as HTMLElement).getBoundingClientRect();
            currentLineRef.current.endPoint = {
                x: rect.x + rect.width / 2 - canvasOffset.x,
                y: rect.y + rect.height / 2 - canvasOffset.y
            };
            hoverAnchorRef.current = {element: targetElement, id: targetAnchor};
        } else {
            // 如果没有找到附近的锚点，使用鼠标当前位置
            currentLineRef.current.endPoint = {x: mouseX, y: mouseY};
            hoverAnchorRef.current = {element: null, id: null};
        }

        const contPoi = BpCanvasUtil.calculateControlPoint(startPoint!, endPoint!);
        currentLineRef.current.firstCP = contPoi.firstCP;
        currentLineRef.current.secondCP = contPoi.secondCP;
        currentLineRef.current.color = bpLineConfig.connectingColor;
        currentLineRef.current.lineWidth = bpLineConfig.connectingWidth;
        BpCanvasUtil.reDrawLine(currentLineRef.current, dragLineRef.current!)
    }

    // 新增：查找附近锚点的函数
    const findNearbyAnchor = (mouseX: number, mouseY: number, range: number = 10) => {
        // 获取所有锚点元素
        const anchorPoints = document.querySelectorAll('.ap-circle');
        let closestAnchor: string | null = null;
        let closestElement: HTMLElement | null = null;
        let minDistance = range; // 最小距离阈值

        anchorPoints.forEach((ap: Element) => {
            const anchorElement = ap as HTMLElement;
            const pointInfoArr = anchorElement.id.split(":");

            // 只检测输入类型的锚点（作为连线目标）
            if (pointInfoArr && pointInfoArr.length === 3 && pointInfoArr[2] === AnchorPointType.INPUT.toString()) {
                const rect = anchorElement.getBoundingClientRect();
                const anchorCenterX = rect.x + rect.width / 2 - bluePrintManager.canvasOffset.x;
                const anchorCenterY = rect.y + rect.height / 2 - bluePrintManager.canvasOffset.y;

                // 计算鼠标位置与锚点中心的距离
                const distance = Math.sqrt(
                    Math.pow(mouseX - anchorCenterX, 2) +
                    Math.pow(mouseY - anchorCenterY, 2)
                );

                // 如果距离在范围内且比当前最近锚点更近，更新最近锚点
                if (distance < minDistance) {
                    minDistance = distance;
                    closestAnchor = anchorElement.id;
                    closestElement = anchorElement;
                }
            }
        });

        return {targetAnchor: closestAnchor, targetElement: closestElement};
    }

    const bpMouseUp = (e: MouseEvent) => {
        const endElem = e.target as HTMLElement;

        // 新增：优先使用悬停的锚点（如果存在）
        const targetElement = hoverAnchorRef.current.element || endElem;
        const targetId = hoverAnchorRef.current.id || targetElement?.id;

        if (!keyMoveRef.current || !keyDownRef.current || !targetElement ||
            !targetElement.classList.contains('ap-circle') ||
            targetId?.split(":")[2] !== AnchorPointType.INPUT.toString()) {
            //清空画布
            dragLineRef.current?.clear();
            keyDownRef.current = false;
            hoverAnchorRef.current = {element: null, id: null}; // 重置悬停状态
            return;
        }
        const {canvasOffset, addAPMap, addLine, addAPLineMap} = bluePrintManager;
        keyDownRef.current = false;
        //清空临时拖拽线
        dragLineRef.current?.clear();

        currentLineRef.current.id = IdGenerate.generateId();
        currentLineRef.current.lineWidth = bpLineConfig.lineWidth;
        currentLineRef.current.color = bpLineConfig.lineColor;
        currentLineRef.current.endAnchorId = targetId;

        const {x, y, width: apw, height: aph} = targetElement.getBoundingClientRect();
        currentLineRef.current.endPoint = {x: x + apw / 2 - canvasOffset.x, y: y + aph / 2 - canvasOffset.y};

        const copyLine = cloneDeep(currentLineRef.current);
        BpCanvasUtil.createLine(copyLine);
        addLine(copyLine);

        addAPMap(currentLineRef.current.startAnchorId!, currentLineRef.current.endAnchorId);
        //添加锚点与线条的关联关系
        addAPLineMap(currentLineRef.current.startAnchorId!, currentLineRef.current.id!);
        addAPLineMap(currentLineRef.current.endAnchorId!, currentLineRef.current.id!);

        // 重置悬停状态
        hoverAnchorRef.current = {element: null, id: null};
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

