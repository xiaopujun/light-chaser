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

import bluePrintManager, {IBPLine, IPoint} from "../manager/BluePrintManager.ts";
import {Graphics} from "pixi.js";


export interface CubicBezierCurvesCP {
    firstCP: IPoint;
    secondCP: IPoint;
}

export const bpLineConfig = {
    connectingColor: '#565656',
    connectingWidth: 1,
    lineColor: '#737373',
    lineWidth: 2,
    hoverColor: '#6eb8ff',
    hoverWidth: 3,
    circleRadius: 4,
    selectedColor: '#1a8fff',
    selectedWidth: 4,
}

export default class BpCanvasUtil {

    //计算三次贝塞尔曲线的2个控制点
    public static calculateControlPoint(startPos: IPoint, endPos: IPoint): CubicBezierCurvesCP {
        const direction = endPos.x < startPos.x ? 'left' : 'right';
        const boxWidth = Math.abs(endPos.x - startPos.x);
        const firstCP: IPoint = {x: 0, y: 0};
        const secondCP: IPoint = {x: 0, y: 0};
        //计算贝塞尔控制点
        if (direction === 'right') {
            firstCP.x = startPos.x + (boxWidth * 0.5);
            firstCP.y = startPos.y;
            secondCP.x = endPos.x - (boxWidth * 0.5);
            secondCP.y = endPos.y;
        } else {
            firstCP.x = startPos.x + (boxWidth * 0.8);
            firstCP.y = startPos.y;
            secondCP.x = endPos.x - (boxWidth * 0.8);
            secondCP.y = endPos.y;
        }
        return {firstCP, secondCP};
    }

    public static reRenderAllLine = () => {
        const {bpLines, canvasOffset, lineInstances} = bluePrintManager!;
        const lines = Object.values(bpLines);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            //重新设置连线的起始点和终点
            const {startAnchorId, endAnchorId} = line;
            const startDom = document.getElementById(startAnchorId!);
            const endDom = document.getElementById(endAnchorId!);
            if (!startDom || !endDom)
                continue;
            const {x: startX, y: startY, width: startW, height: startH} = startDom!.getBoundingClientRect();
            const {x: endX, y: endY, width: endW, height: endH} = endDom!.getBoundingClientRect();
            //定位到锚点中心
            line.startPoint = {
                x: startX + (startW / 2) - canvasOffset.x,
                y: startY + (startH / 2) - canvasOffset.y
            };
            line.endPoint = {
                x: endX + (endW / 2) - canvasOffset.x,
                y: endY + (endH / 2) - canvasOffset.y
            };
            //重新计算二次贝塞尔曲线的控制点
            const controlPoi = BpCanvasUtil.calculateControlPoint(line.startPoint, line.endPoint);
            line.firstCP = controlPoi.firstCP;
            line.secondCP = controlPoi.secondCP;

            const lineInstance = lineInstances[line.id!];
            if (!lineInstance) {
                BpCanvasUtil.createLine({...line});
            } else {
                BpCanvasUtil.reDrawLine(line, lineInstance)
            }
        }
    }

    public static updNodeAndLinePos = (nodeId: string, position: IPoint) => {
        const {
            bpNodeControllerInsMap, bpAPLineMap, bpLines,
            updLinePos, updBpNodeLayout, canvasOffset
        } = bluePrintManager;
        //更新节点位置
        updBpNodeLayout({
            id: nodeId,
            position: {
                x: position.x,
                y: position.y
            }
        })
        //更新线段位置
        const bpNodeCtrlIns = bpNodeControllerInsMap[nodeId];
        const {input = [], output = []} = bpNodeCtrlIns.getConfig();
        const aps = [...input!, ...output!];

        aps && aps.forEach(ap => {
            const lineIds = bpAPLineMap[ap.id!];
            if (!lineIds)
                return;
            for (let i = 0; i < lineIds.length; i++) {
                const lineId = bpAPLineMap[ap.id!][i];
                const lineInfo = bpLines[lineId];
                if (lineInfo) {
                    const {startAnchorId, endAnchorId} = lineInfo;
                    const startDom = document.getElementById(startAnchorId!);
                    const endDom = document.getElementById(endAnchorId!);
                    if (!startDom || !endDom)
                        continue;
                    const {x: startX, y: startY, width: startW, height: startH} = startDom!.getBoundingClientRect();
                    const {x: endX, y: endY, width: endW, height: endH} = endDom!.getBoundingClientRect();
                    updLinePos({
                        id: lineId,
                        //定位到锚点中心
                        startPoint: {
                            x: startX + (startW / 2) - canvasOffset.x,
                            y: startY + (startH / 2) - canvasOffset.y
                        },
                        endPoint: {
                            x: endX + (endW / 2) - canvasOffset.x,
                            y: endY + (endH / 2) - canvasOffset.y
                        }
                    })
                }
            }
        });
    }

    private static cubicBezierPoint(s: IPoint, p1: IPoint, p2: IPoint, e: IPoint, t: number): IPoint {
        const x = Math.pow(1 - t, 3) * s.x +
            3 * Math.pow(1 - t, 2) * t * p1.x +
            3 * (1 - t) * Math.pow(t, 2) * p2.x +
            Math.pow(t, 3) * e.x;

        const y = Math.pow(1 - t, 3) * s.y +
            3 * Math.pow(1 - t, 2) * t * p1.y +
            3 * (1 - t) * Math.pow(t, 2) * p2.y +
            Math.pow(t, 3) * e.y;

        return {x, y};
    }

    public static createLine = (line: IBPLine) => {
        const bpManager = bluePrintManager!;
        const bezier = new Graphics();
        bpManager.lineInstances[line.id!] = bezier;
        bpManager.pixiApp?.stage.addChild(bezier);
        bezier.interactive = true;
        (line.startPoint as any).fuck = '去他妈的'

        const {startPoint, endPoint, firstCP, secondCP, lineWidth, color} = line;

        bezier.moveTo(startPoint?.x ?? 0, startPoint?.y ?? 0)
        bezier.bezierCurveTo(firstCP?.x ?? 0, firstCP?.y ?? 0, secondCP?.x ?? 0, secondCP?.y ?? 0, endPoint?.x ?? 0, endPoint?.y ?? 0);
        bezier.stroke({width: lineWidth, color: color});

        const middlePoint = BpCanvasUtil.cubicBezierPoint(startPoint!, firstCP!, secondCP!, endPoint!, 0.5);

        // 绘制圆形
        bezier.circle(middlePoint.x, middlePoint.y, bpLineConfig.circleRadius);
        bezier.fill(line.color);

        bezier.on('click', (e: any) => {
            if (e.ctrlKey) {
                bpManager.delLine([line.id!])
            } else {
                bpManager.setSelectedLines([line.id!])
                const {startPoint, firstCP, secondCP, endPoint} = bpManager.bpLines[line.id!]!
                bezier.clear();
                bezier.moveTo(startPoint?.x ?? 0, startPoint?.y ?? 0)
                bezier.bezierCurveTo(firstCP?.x ?? 0, firstCP?.y ?? 0, secondCP?.x ?? 0, secondCP?.y ?? 0, endPoint?.x ?? 0, endPoint?.y ?? 0);
                bezier.stroke({width: bpLineConfig.selectedWidth, color: bpLineConfig.selectedColor});

                const middlePoint = BpCanvasUtil.cubicBezierPoint(startPoint!, firstCP!, secondCP!, endPoint!, 0.5);
                // 绘制圆形
                bezier.circle(middlePoint.x, middlePoint.y, bpLineConfig.circleRadius);
                bezier.fill(bpLineConfig.selectedColor);
            }
        })

        bezier.on('mouseover', () => {
            bpManager.pixiApp && (bpManager.pixiApp.canvas.style.cursor = 'pointer')
            if (bpManager.selectedLines.some((lineId: any) => lineId === line.id))
                return;
            const {startPoint, firstCP, secondCP, endPoint} = bpManager.bpLines[line.id!]!
            bezier.clear();
            bezier.moveTo(startPoint?.x ?? 0, startPoint?.y ?? 0)
            bezier.bezierCurveTo(firstCP?.x ?? 0, firstCP?.y ?? 0, secondCP?.x ?? 0, secondCP?.y ?? 0, endPoint?.x ?? 0, endPoint?.y ?? 0);
            bezier.stroke({width: bpLineConfig.hoverWidth, color: bpLineConfig.hoverColor});

            const middlePoint = BpCanvasUtil.cubicBezierPoint(startPoint!, firstCP!, secondCP!, endPoint!, 0.5);
            // 绘制圆形
            bezier.circle(middlePoint.x, middlePoint.y, bpLineConfig.circleRadius);
            bezier.fill(bpLineConfig.hoverColor);
        })
        bezier.on('mouseout', () => {
            bpManager.pixiApp && (bpManager.pixiApp.canvas.style.cursor = 'default')
            if (bpManager.selectedLines.some((lineId: any) => lineId === line.id))
                return;
            const {startPoint, firstCP, secondCP, endPoint} = bpManager.bpLines[line.id!]!
            bezier.clear();
            bezier.moveTo(startPoint?.x ?? 0, startPoint?.y ?? 0)
            bezier.bezierCurveTo(firstCP?.x ?? 0, firstCP?.y ?? 0, secondCP?.x ?? 0, secondCP?.y ?? 0, endPoint?.x ?? 0, endPoint?.y ?? 0);
            bezier.stroke({width: bpLineConfig.lineWidth, color: bpLineConfig.lineColor});

            const middlePoint = BpCanvasUtil.cubicBezierPoint(startPoint!, firstCP!, secondCP!, endPoint!, 0.5);
            // 绘制圆形
            bezier.circle(middlePoint.x, middlePoint.y, bpLineConfig.circleRadius);
            bezier.fill(bpLineConfig.lineColor);
        })
    }

    public static reDrawLine = (line: IBPLine, bezier: Graphics) => {
        const {startPoint, endPoint, firstCP, secondCP, lineWidth, color} = line;
        bezier?.clear();
        bezier?.moveTo(startPoint?.x ?? 0, startPoint?.y ?? 0)
        bezier?.bezierCurveTo(firstCP?.x ?? 0, firstCP?.y ?? 0, secondCP?.x ?? 0, secondCP?.y ?? 0, endPoint?.x ?? 0, endPoint?.y ?? 0);
        bezier?.stroke({width: lineWidth, color});

        const middlePoint = BpCanvasUtil.cubicBezierPoint(line.startPoint!, line.firstCP!, line.secondCP!, line.endPoint!, 0.5);
        // 绘制圆形
        bezier.circle(middlePoint.x, middlePoint.y, bpLineConfig.circleRadius);
        bezier.fill(color);
    }
}