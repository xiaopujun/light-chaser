import React, {useEffect} from "react";
import Moveable, {OnDrag, OnDragEnd, OnDragStart} from "react-moveable";
import bpStore from "../store/BPStore";
import {observer} from "mobx-react";
import {CanvasLineType} from "../types";
import CanvasUtil from "../util/CanvasUtil";

export interface BPMovableProps {
    children?: React.ReactNode;
}

export const reRenderLine = () => {
    const {bpLines, downCtx, canvasOffset} = bpStore;
    //更新每条线的起始点和终点
    Object.values(bpLines).forEach((line: CanvasLineType) => {
        //重新设置连线的起始点和终点
        const {startAnchorId, endAnchorId} = line;
        const startDom = document.getElementById(startAnchorId!);
        const endDom = document.getElementById(endAnchorId!);
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
        const controlPoi = CanvasUtil.calculateControlPoint(line.startPoint, line.endPoint);
        line.firstCP = controlPoi.firstCP;
        line.secondCP = controlPoi.secondCP;
    });

    //重新绘制连线
    downCtx!.clearRect(0, 0, 10000, 10000);
    Object.values(bpLines).forEach((line: CanvasLineType) => {
        CanvasUtil.drawBezierCurves(downCtx!, line);
    })
}

export const BPMovable = observer((props: BPMovableProps) => {
        const {children} = props;
        const movableRef = React.createRef<Moveable>();

        useEffect(() => {
            const {setBpMovableRef} = bpStore;
            setBpMovableRef(movableRef.current!);
        })

        const onDrag = (e: OnDrag) => {
            const {target, beforeTranslate} = e;
            target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
            //重绘连线
            reRenderLine();
        }

        const onDragStart = (e: OnDragStart) => {
            const {inputEvent: {target}} = e;
            if (target.classList.contains('ap-circle'))
                return false;
        }

        const onDragEnd = (e: OnDragEnd) => {
            const {bpNodes, updNodePos, bpAPLineMap, bpLines, updLinePos} = bpStore;
            const {target, lastEvent} = e;
            const {beforeTranslate} = lastEvent;
            const nodeId = target.id.split(':')[1];
            //更新节点位置
            updNodePos({
                id: nodeId,
                position: {
                    x: beforeTranslate[0],
                    y: beforeTranslate[1]
                }
            });
            //更新线段位置
            const {input = [], output = []} = bpNodes[nodeId];
            const aps = [...input!, ...output!];
            aps && aps.forEach(ap => {
                const lineIds = bpAPLineMap[ap.id!];
                lineIds && lineIds.forEach(lineId => {
                    const lineInfo = bpLines[lineId];
                    if (lineInfo) {
                        const {startAnchorId, endAnchorId} = lineInfo;
                        const startDom = document.getElementById(startAnchorId!);
                        const endDom = document.getElementById(endAnchorId!);
                        const {x: startX, y: startY, width: startW, height: startH} = startDom!.getBoundingClientRect();
                        const {x: endX, y: endY, width: endW, height: endH} = endDom!.getBoundingClientRect();
                        updLinePos({
                            id: lineId,
                            //定位到锚点中心
                            startPoint: {
                                x: startX + (startW / 2),
                                y: startY + (startH / 2)
                            },
                            endPoint: {
                                x: endX + (endW / 2),
                                y: endY + (endH / 2)
                            }
                        })
                    }
                })
            });
        }

        const {selectedNodes} = bpStore;
        return (
            <>
                {children}
                <Moveable ref={movableRef}
                          target={selectedNodes}
                          draggable={true}
                          origin={false}
                          hideDefaultLines={true}
                          onDrag={onDrag}
                          onDragStart={onDragStart}
                          onDragEnd={onDragEnd}
                />
            </>
        )
    }
)
